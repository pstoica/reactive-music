export default (scheduler) => {
  const $ = new Rx.Subject();

  const $$ = scheduler.scheduleRecursiveWithRelative(
    1,
    (self) => {
      let notes = Obs.zip(
        // alternate on/off
        Obs.from([true, false]),

        // note, paired for on/off
        Obs
          .fromArray([60 + 24])
          .flatMap(x => Obs.repeat(x, 2)),

        // times, delayed by 0.5 seconds
        Obs.from([0, 1]).map(x => scheduler.clock + x * 0.5),

        // convert to note-compatible object
        (on, key, time) => ({ on, key, time })
      );

      notes.subscribe(::$.onNext);

      // virtual temporal recursion
      self(1);
    }
  );

  module.hot && module.hot.dispose(() => {
    $.dispose();
    $$.dispose();
  });

  return $;
};
