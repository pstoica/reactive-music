var midi = require('./midi');
var scheduler = require('./scheduler');

module.hot.accept();

navigator
  .requestMIDIAccess()
  .then(access => {
    let outputs = [...access.outputs];
    let OP1 = outputs.filter(output => {
      return output[1].name.startsWith('OP-1');
    })[0][1];

    return Promise.resolve(OP1);
  })
  .then(OP1 => {
    scheduler.scheduleRelative(1000, function () {
      OP1.send(midi.createNote({
        on: true,
        key: 60
      }), scheduler.clock);
      OP1.send(midi.createNote({
        on: false,
        key: 60
      }), scheduler.clock + 500);
    });

    scheduler.scheduleRelative(2000, function () {
      OP1.send(midi.createNote({
        on: true,
        key: 62 + 12
      }), scheduler.clock);
      OP1.send(midi.createNote({
        on: false,
        key: 62 + 12
      }), scheduler.clock + 500);
    });

    scheduler.scheduleRelative(3000, function () {
      OP1.send(midi.createNote({
        on: true,
        key: 64 + 12
      }), scheduler.clock);
      OP1.send(midi.createNote({
        on: false,
        key: 64 + 12
      }), scheduler.clock + 500);
    });
  })
  .catch(::console.error);

const disposable = Rx.Scheduler.default.schedulePeriodic(
  300, /* .3 seconds */
  () => {
    scheduler.advanceBy(350);
  }
);
