/**
 * Creates an observable from the given source and configures its subscription and observation schedulers.
 *
 * @param {any} sourceInput - The input used to create the source observable.
 * @param {any} scheduler - The scheduler to use for subscribing and observing the observable.
 * @returns {Observable} The configured observable with specified subscribeOn and observeOn schedulers.
 */
function createConfiguredObservable(sourceInput, scheduler) {
  // Create an observable from the provided source input
  // and configure isBlobOrFileLikeObject to subscribe and observe on the given scheduler
  return LM9.innerFrom(sourceInput)
    .pipe(
      OM9.subscribeOn(scheduler), // Set the scheduler for subscription
      RM9.observeOn(scheduler)    // Set the scheduler for observation
    );
}

module.exports = createConfiguredObservable;