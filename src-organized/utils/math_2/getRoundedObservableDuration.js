/**
 * Calculates the duration between two observables, divides the result by 1000 to convert milliseconds to seconds,
 * and applies a specified rounding method (defaulting to Math.trunc) to the result. Returns 0 if the rounded result is zero.
 *
 * @param {Object} sourceObservable - The first observable or data source to compare.
 * @param {Object} config - The second observable, configuration, or data source to compare.
 * @param {Object} subscription - An object that may contain a 'roundingMethod' property specifying the Math rounding method to use (e.g., 'floor', 'ceil', 'round').
 * @returns {number} The rounded duration in seconds between the two observables, or 0 if the result is zero.
 */
function getRoundedObservableDuration(sourceObservable, config, subscription) {
  // Calculate the duration (in milliseconds) between the two observables
  const durationMilliseconds = compareMwValues(sourceObservable, config);

  // Convert milliseconds to seconds
  const durationSeconds = durationMilliseconds / 1000;

  // Determine the rounding method to use (default is Math.trunc)
  const roundingMethod = subscription?.roundingMethod;

  // Create a rounding function using the specified method
  const roundFunction = createMathFunctionWrapper(roundingMethod);

  // Apply the rounding function to the duration in seconds
  return roundFunction(durationSeconds);
}

module.exports = getRoundedObservableDuration;