/**
 * Calculates the difference between two observables with a case-sensitive comparison.
 *
 * @function getObservableDifference
 * @param {Object} sourceObservable - The first observable to compare.
 * @param {Object} comparisonConfig - Configuration object for the comparison.
 * @returns {any} The result of the observable difference calculation.
 *
 * This function delegates to calculateObservableDifference, enforcing case sensitivity by setting ignoreCase to false.
 */
function getObservableDifference(sourceObservable, comparisonConfig) {
  // Call calculateObservableDifference with ignoreCase set to false for case-sensitive comparison
  return calculateObservableDifference(sourceObservable, comparisonConfig, {
    ignoreCase: false
  });
}

module.exports = getObservableDifference;