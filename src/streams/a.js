export default (scheduler) => {
  const $ = new Rx.Subject();

  const $$ = scheduler.schedulePeriodic(
    1,
    () => {
      let notes = Obs.zip(
        // alternate on/off
        Obs
          .fromArray([true, false])
          .flatMap(x => Obs.repeat(x, 3)),

        // note, paired for on/off
        Obs
          .fromArray([60, 62, 64])
          .flatMap(x => Obs.repeat(x, 2)),

        Obs.range(0, 3).flatMap(x => {
          const on = scheduler.clock + (x * (1/3))
          const off = on + (1/3);
          return Obs.fromArray([on, off]);
        }),

        // convert to note-compatible object
        (on, key, time) => ({ on, key, time })
      );

      notes.subscribe(::$.onNext);
    }
  );

  module.hot && module.hot.dispose(() => {
    $.dispose();
    $$.dispose();
  });

  return $;
}

