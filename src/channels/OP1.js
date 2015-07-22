import µ from 'utils';
let a = require('streams/a');
import b from 'streams/b';

console.log('reevaluate');

export default (scheduler) => {
  const a$ = new Rx.Subject();
  a(scheduler).subscribe(::a$.onNext);

  const $ = µ.requestChannel('DEBUGGER').subscribe(
    (m) => {
      Obs
        .merge(a$)
        .subscribe(
          ({ time, ...note }) => {
            m.onNext({ note, time });
          }
        );
    },
    (e) => ::console.error
  );

  module.hot.accept('streams/a', (a) => {
    a = require('streams/a');
    a(scheduler).subscribe(::a$.onNext);
  });

  module.hot && module.hot.dispose(() => $.dispose());

  return Obs.just(1);
}

