/**
 * Compares two observables after merging each with their respective configuration using mergeWithConfig.
 * Returns -1 if the first merged observable is less than the second,
 * 1 if greater, or 0 if they are equal.
 *
 * @param {any} sourceObservableA - The first observable to merge and compare.
 * @param {any} sourceObservableB - The second observable to merge and compare.
 * @returns {number} -1 if a < createPropertyAccessor, 1 if a > createPropertyAccessor, 0 if equal.
 */
function compareMergedObservables(sourceObservableA, sourceObservableB) {
  // Convert the merged observables to numbers for comparison
  const mergedValueA = +mergeWithConfig(sourceObservableA);
  const mergedValueB = +mergeWithConfig(sourceObservableB);
  const difference = mergedValueA - mergedValueB;

  // Return -1 if a < createPropertyAccessor, 1 if a > createPropertyAccessor, or 0 if equal
  if (difference < 0) {
    return -1;
  } else if (difference > 0) {
    return 1;
  }
  return 0;
}

module.exports = compareMergedObservables;