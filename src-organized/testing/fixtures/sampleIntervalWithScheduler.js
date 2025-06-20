/**
 * Emits the most recent value from the source observable at specified intervals using a scheduler.
 *
 * @param {number} intervalDuration - The time interval (in milliseconds) at which to sample the source observable.
 * @param {SchedulerLike} [scheduler=$k9.asyncScheduler] - The scheduler to use for managing the intervals. Defaults to asyncScheduler.
 * @returns {Observable} An observable that emits the most recent value from the source observable at each interval.
 */
function sampleIntervalWithScheduler(intervalDuration, scheduler = $k9.asyncScheduler) {
  // Create an interval observable using the provided duration and scheduler
  const intervalObservable = Mk9.interval(intervalDuration, scheduler);
  // Use the sample operator to emit the latest value from the source observable whenever the interval emits
  return qk9.sample(intervalObservable);
}

module.exports = sampleIntervalWithScheduler;