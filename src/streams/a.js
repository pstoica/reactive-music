scheduler.scheduleRelative(2000, function play() {
  //console.log(scheduler.clock);
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
    Rx.Observable.range(0, 6).map(x => scheduler.clock + x * 500),

    // convert to note-compatible object
    (on, key, time) => ({ on, key, time })
  );

  notes.subscribe(::$.onNext);

  scheduler.scheduleRelative(2000, play);
});
