/**
 * Creates a throttled observable timer using the provided scheduler and throttle configuration.
 *
 * @param {number|Date} dueTime - The initial delay time (in milliseconds or as a Date) before emitting the first value.
 * @param {SchedulerLike} [scheduler=fy9.asyncScheduler] - The scheduler to use for managing the timers. Defaults to fy9.asyncScheduler if not provided.
 * @param {any} throttleConfig - The configuration or duration selector for the throttle operator.
 * @returns {Observable} a throttled observable timer.
 */
function createThrottledTimerObservable(dueTime, scheduler = fy9.asyncScheduler, throttleConfig) {
  // Create a timer observable with the specified dueTime and scheduler
  const timerObservable = by9.timer(dueTime, scheduler);

  // Return a throttled observable using the provided throttle configuration
  // The throttle function expects a function that returns an observable (the timer)
  return vy9.throttle(() => timerObservable, throttleConfig);
}

module.exports = createThrottledTimerObservable;