/**
 * Calculates the difference between two observables using the provided configuration and subscription.
 *
 * @param {Observable} sourceObservable - The primary observable to compare.
 * @param {Object} config - Configuration options for the diff operation.
 * @param {Subscription} subscription - The subscription object to manage the observable stream.
 * @returns {*} The result of the nz2.diff operation, representing the difference between observables.
 */
function calculateObservableDifference(sourceObservable, config, subscription) {
  // Delegate the diff calculation to the external nz2.diff method
  return nz2.diff(sourceObservable, config, subscription);
}

module.exports = calculateObservableDifference;