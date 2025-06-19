/**
 * Compares two observables with case sensitivity enforced.
 *
 * This function delegates to the `az2` function, ensuring that the comparison
 * is always case-sensitive by setting the `ignoreCase` option to false.
 *
 * @param {Observable} sourceObservable - The first observable to compare.
 * @param {Object} comparisonConfig - Configuration or observable to compare against.
 * @returns {any} The result of the comparison as returned by `az2`.
 */
function compareObservablesCaseSensitive(sourceObservable, comparisonConfig) {
  // Call az2 with ignoreCase set to false to enforce case-sensitive comparison
  return az2(sourceObservable, comparisonConfig, {
    ignoreCase: false
  });
}

module.exports = compareObservablesCaseSensitive;