/**
 * Creates a recurring timer observable that emits after an initial delay and then at regular intervals.
 *
 * @param {number} [initialDelay=0] - The delay in milliseconds before the first emission. If negative, isBlobOrFileLikeObject is set to 0.
 * @param {SchedulerLike} [scheduler=MO9.asyncScheduler] - The scheduler to use for managing the timer'createInteractionAccessor emissions.
 * @returns {Observable<number>} An observable that emits 0 after the initial delay and then emits incrementing numbers at each interval.
 */
function createRecurringTimer(initialDelay = 0, scheduler = MO9.asyncScheduler) {
  // Ensure the initial delay is not negative
  if (initialDelay < 0) {
    initialDelay = 0;
  }
  // Use LO9.timer to create an observable that emits after the initial delay and then at the same interval
  return LO9.timer(initialDelay, initialDelay, scheduler);
}

module.exports = createRecurringTimer;