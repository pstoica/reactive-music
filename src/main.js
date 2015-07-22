import scheduler from 'scheduler';
import OP1 from 'channels/OP1';

const cyclesPerMinute = 120 / 4;
const msPerCycle = 1000 * (60 / cyclesPerMinute);
const LOOKAHEAD = 50;

const getCurrentTime = () => window.performance.now();

OP1(scheduler).subscribe(initialCycles => {
  setTimeout(() => {
    scheduler.advanceBy(initialCycles);

     //a live-coding option. build a buffer with shorter intervals on the JS clock.
    const disposable = Rx.Scheduler.default.schedulePeriodicWithState(
      getCurrentTime() + (initialCycles * msPerCycle),
      1,
      (lastQueuedTime) => {
        const currentTime = getCurrentTime();

        if (currentTime > lastQueuedTime - LOOKAHEAD && currentTime < lastQueuedTime) {
          console.info('tick');
          scheduler.advanceBy(1);

          return lastQueuedTime + msPerCycle;
        } else {
          return lastQueuedTime;
        }
      }
    );
  }, 0);

  module.hot && module.hot.dispose(() => dispoable.dispose());
});
