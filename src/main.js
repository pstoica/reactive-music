import scheduler from 'scheduler';
import OP1 from 'channels/OP1';

const getCurrentTime = () => window.performance.now();

OP1(scheduler).subscribe(initialCycles => {
  setTimeout(() => {
    window.START_TIME = window.performance.now();
    scheduler.advanceBy(initialCycles);

     //a live-coding option. build a buffer with shorter intervals on the JS clock.
    const disposable = Rx.Scheduler.default.schedulePeriodicWithState(
      getCurrentTime() + (initialCycles * window.MS_PER_CYCLE),
      LOOKAHEAD / 2,
      (lastQueuedTime) => {
        const currentTime = getCurrentTime();

        if (currentTime > lastQueuedTime - LOOKAHEAD && currentTime < lastQueuedTime) {
          console.info('tick', window.performance.now());
          scheduler.advanceBy(1);

          return lastQueuedTime + window.MS_PER_CYCLE;
        } else {
          return lastQueuedTime;
        }
      }
    );
  }, 0);

  module.hot && module.hot.dispose(() => dispoable.dispose());
});
