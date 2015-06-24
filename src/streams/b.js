scheduler.scheduleRelative(2000, function play() {
  let notes = Rx.Observable.zip(
    // alternate on/off
    Rx.Observable.from([true, false]),

    // note, paired for on/off
    Rx.Observable
      .fromArray([60 + 24])
      .flatMap(x => Rx.Observable.repeat(x, 2)),

    // times, delayed by 0.5 seconds
    Rx.Observable.from([0, 1]).map(x => scheduler.clock + x * 1500),

    // convert to note-compatible object
    (on, key, time) => ({ on, key, time })
  );

  notes.subscribe(::$.onNext);

  // virtual temporal recursion
  scheduler.scheduleRelative(1000, play);
});
