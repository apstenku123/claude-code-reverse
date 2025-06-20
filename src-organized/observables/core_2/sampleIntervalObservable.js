/**
 * Emits sampled values from an interval observable using the provided scheduler.
 *
 * @param {number} intervalDuration - The time interval (in milliseconds) for emitting values.
 * @param {SchedulerLike} [scheduler=$k9.asyncScheduler] - The scheduler to use for managing the timers that handle the emissions of the values.
 * @returns {Observable} An observable that emits sampled values at the specified interval.
 */
function sampleIntervalObservable(intervalDuration, scheduler = $k9.asyncScheduler) {
  // Create an interval observable with the specified duration and scheduler
  const intervalObservable = Mk9.interval(intervalDuration, scheduler);
  // Sample the values emitted by the interval observable
  return qk9.sample(intervalObservable);
}

module.exports = sampleIntervalObservable;