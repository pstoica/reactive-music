import µ from 'utils';
import a from 'streams/a';
import b from 'streams/b';

export default (scheduler) => {
  const $ = µ.requestChannel('DEBUGGER').subscribe(
    (m) => {
      Obs
        .merge(
          a(scheduler)
        )
        .subscribe(
          ({ time, ...note }) => {
            m.onNext({ note, time });
          }
        );
    },
    (e) => ::console.error
  );

  module.hot && module.hot.dispose(() => $.dispose());

  return Obs.just(1);
}

