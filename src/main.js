import scheduler from 'scheduler';
import OP1 from 'channels/OP1';

const cyclesPerMinute = 120 / 4;
const secondsPerCycle = 60 / cyclesPerMinute;
const LOOKAHEAD = secondsPerCycle / 3;
const audioCtx = new AudioContext();

OP1(scheduler);
scheduler.advanceBy(LOOKAHEAD);

 //a live-coding option. build a buffer with shorter intervals on the JS clock.
const disposable = Rx.Scheduler.default.schedulePeriodicWithState(
  audioCtx.currentTime + LOOKAHEAD,
  LOOKAHEAD / 5,
  (lastQueuedTime) => {
    const {currentTime} = audioCtx;
    console.info(currentTime);

    if (currentTime > lastQueuedTime) {
      scheduler.advanceBy(LOOKAHEAD);

      return currentTime + LOOKAHEAD;
    } else {
      return lastQueuedTime;
    }
  }
);

module.hot && module.hot.dispose(() => dispoable.dispose());
