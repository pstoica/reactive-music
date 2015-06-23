var midi = require('./midi');
var scheduler = require('./scheduler');

module.hot.accept();

navigator
  .requestMIDIAccess()
  .then(access => {
    const outputs = [...access.outputs];
    const OP1 = outputs.filter(output => {
      return output[1].name.startsWith('OP-1');
    })[0][1];

    const subject = new Rx.Subject();
    subject.subscribe(
      ({ time, ...note }) => {
        console.log(note, time);
        OP1.send(midi.createNote(note), time);
      }
    );

    return Promise.resolve(subject);
  })
  .then(OP1 => {
    scheduler.scheduleRelative(1000, () => {
      let notes = Rx.Observable.zip(
        // alternate on/off
        Rx.Observable.merge(
          Rx.Observable.repeat(true, 3),
          Rx.Observable.repeat(false, 3)
        ),

        // note, paired for on/off
        Rx.Observable
          .fromArray([60, 62 + 12, 64 + 12])
          .flatMap(x => Rx.Observable.repeat(x, 2)),

        // times, delayed by 0.5 seconds
        Rx.Observable.range(0, 6).map(x => 1000 + x * 500),

        // convert to note-compatible object
        (on, key, time) => ({ on, key, time })
      );

      notes.subscribe(OP1);
    });
  })
  .catch(::console.error);

setTimeout(::scheduler.start, 0);

//const disposable = Rx.Scheduler.default.schedulePeriodic(
  //300, [> .3 seconds <]
  //() => {
    //scheduler.advanceBy(325);
  //}
//);
