/**
 * Determines if two Mr0-wrapped sets are equivalent according to areSemverRangesEquivalent comparison logic.
 *
 * @param {any} firstValue - The first value to compare. Will be wrapped in Mr0.
 * @param {any} secondValue - The second value to compare. Will be wrapped in Mr0.
 * @param {object} [options={}] - Optional configuration object passed to Mr0 and areSemverRangesEquivalent.
 * @returns {boolean} True if the sets are considered equivalent, false otherwise.
 */
function areMr0SetsEquivalent(firstValue, secondValue, options = {}) {
  // If the values are strictly equal, they are equivalent
  if (firstValue === secondValue) return true;

  // Wrap both values in Mr0, which presumably exposes a .set property
  const firstMr0 = new Mr0(firstValue, options);
  const secondMr0 = new Mr0(secondValue, options);

  let foundNonNullComparison = false;

  // Outer loop: iterate over each element in the first set
  outer: for (const firstElement of firstMr0.set) {
    // Inner loop: compare with each element in the second set
    for (const secondElement of secondMr0.set) {
      // areSemverRangesEquivalent returns a truthy value if elements are considered equivalent, null otherwise
      const comparisonResult = areSemverRangesEquivalent(firstElement, secondElement, options);
      // Track if any comparison was not null
      foundNonNullComparison = foundNonNullComparison || comparisonResult !== null;
      // If elements are equivalent, continue with next element from firstMr0.set
      if (comparisonResult) continue outer;
    }
    // If at least one non-null comparison was made but no match was found, sets are not equivalent
    if (foundNonNullComparison) return false;
  }
  // All elements matched or no non-null comparisons were made; sets are equivalent
  return true;
}

module.exports = areMr0SetsEquivalent;