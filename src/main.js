import OP1 from './channels/OP1';

module.hot.accept();

// just start the clock when the page is about ready
//setTimeout(::scheduler.start, 0);

 //a live-coding option. build a buffer with shorter intervals on the JS clock.
const disposable = Rx.Scheduler.default.schedulePeriodic(
  300,
  () => {
    scheduler.advanceBy(325);
  }
);
