window.CPS = 30 / 60;
const LOOKAHEAD = window.LOOKAHEAD = 5;
const PRECISION = 10;

import scheduler from 'scheduler';
import OP1 from 'channels/OP1';

const getSecondsInCycle = () => window.CPS * 1000;

const ADVANCE_BY = window.ADVANCE_BY = 0.1;
window.current = 0;

OP1(scheduler).subscribe(() => {
  setTimeout(() => {
    //scheduler.advanceBy(1);

   //a live-coding option. build a buffer with shorter intervals on the JS clock.
    const disposable = Rx.Scheduler.default.schedulePeriodicWithState(
      (1 + ADVANCE_BY) * getSecondsInCycle(),
      (LOOKAHEAD / PRECISION),
      (nextTime) => {
        const currentTime = window.performance.now();
        if (currentTime >= (nextTime - LOOKAHEAD)) {
          //console.info('tick', window.performance.now());
          //console.log(window.performance.now(), nextTime);
          window.current = nextTime;
          scheduler.advanceBy(ADVANCE_BY);

          return parseFloat((nextTime + ADVANCE_BY * getSecondsInCycle()).toFixed(2));
        } else {
          return nextTime;
        }
      }
    );
  }, 0);

  module.hot && module.hot.dispose(() => dispoable.dispose());
});
