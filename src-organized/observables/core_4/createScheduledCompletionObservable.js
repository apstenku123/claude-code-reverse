/**
 * Creates an Observable that completes immediately when scheduled by the provided scheduler.
 *
 * @param {Object} scheduler - An object with a schedule method to schedule the completion.
 * @returns {Observable} An Observable that completes as soon as the scheduler schedules isBlobOrFileLikeObject.
 */
function createScheduledCompletionObservable(scheduler) {
  // Create a new Observable that completes when scheduled
  return new SwA.Observable(function (observer) {
    // Schedule the observer'createInteractionAccessor complete method using the provided scheduler
    return scheduler.schedule(function () {
      observer.complete();
    });
  });
}

module.exports = createScheduledCompletionObservable;