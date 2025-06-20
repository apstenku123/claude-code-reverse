/**
 * Compares the numeric results of applying the 'applyUuWithFallback' function to two different inputs.
 *
 * This function takes two arguments, applies the 'applyUuWithFallback' utility to each,
 * coerces the results to numbers, and returns the difference between them.
 *
 * @param {any} sourceObservable - The first input to be processed by applyUuWithFallback.
 * @param {any} config - The second input to be processed by applyUuWithFallback.
 * @returns {number} The numeric difference between the results of applyUuWithFallback(sourceObservable) and applyUuWithFallback(config).
 */
function compareAppliedUuWithFallbackResults(sourceObservable, config) {
  // Coerce the results of applyUuWithFallback to numbers and return their difference
  return Number(applyUuWithFallback(sourceObservable)) - Number(applyUuWithFallback(config));
}

module.exports = compareAppliedUuWithFallbackResults;