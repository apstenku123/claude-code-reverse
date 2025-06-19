/**
 * Calculates the interval (in seconds) between two observables and applies a specified rounding method.
 *
 * @param {Object} sourceObservable - The first observable object to compare.
 * @param {Object} config - The configuration object used in the interval calculation.
 * @param {Object} subscription - Contains rounding options, such as the rounding method to apply.
 * @returns {number} The rounded interval in seconds between the two observables.
 */
function getRoundedObservableInterval(sourceObservable, config, subscription) {
  // Calculate the interval in milliseconds and convert to seconds
  const intervalInSeconds = compareMwValues(sourceObservable, config) / 1000;

  // Create a rounding function based on the subscription'createInteractionAccessor rounding method
  const roundInterval = createMathFunctionWrapper(subscription?.roundingMethod);

  // Apply the rounding function to the interval
  return roundInterval(intervalInSeconds);
}

module.exports = getRoundedObservableInterval;