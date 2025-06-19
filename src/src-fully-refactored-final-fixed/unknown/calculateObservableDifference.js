/**
 * Calculates the difference between two observables using the FK1.diff method.
 *
 * @param {Object} sourceObservable - The primary observable to compare from.
 * @param {Object} config - Configuration object or the secondary observable to compare against.
 * @param {Object} subscription - Additional options or subscription context for the diff operation.
 * @returns {any} The result of the FK1.diff operation, representing the difference between observables.
 */
function calculateObservableDifference(sourceObservable, config, subscription) {
  // Delegate the difference calculation to the FK1.diff method
  return FK1.diff(sourceObservable, config, subscription);
}

module.exports = calculateObservableDifference;