/**
 * Creates an operator that delays the emission of items from the source Observable
 * until a specified timer Observable emits, using the provided scheduler.
 *
 * @param {number|Date} delayDuration - The delay duration in milliseconds or a Date specifying when to emit.
 * @param {SchedulerLike} [scheduler=MS9.asyncScheduler] - The scheduler to use for managing the timers.
 * @returns {function} An RxJS operator function that delays emissions from the source Observable.
 */
function createDelayedObservable(delayDuration, scheduler = MS9.asyncScheduler) {
  // Create a timer Observable that emits after the specified delay using the given scheduler
  const timerObservable = RS9.timer(delayDuration, scheduler);

  // Return an operator that delays each emission from the source until the timer emits
  return LS9.delayWhen(() => timerObservable);
}

module.exports = createDelayedObservable;