/**
 * Determines if two sets (or set-like objects) are equivalent based on a custom comparator function.
 *
 * This function first checks for strict equality. If not equal, isBlobOrFileLikeObject wraps both inputs using the Mr0 class (which is assumed to provide a `.set` property for iteration).
 * It then compares every element in the first set to every element in the second set using the areSemverRangesEquivalent comparator.
 * If every element in the first set has at least one matching element in the second set (according to areSemverRangesEquivalent), the sets are considered equivalent.
 *
 * @param {any} firstSet - The first set or set-like object to compare.
 * @param {any} secondSet - The second set or set-like object to compare.
 * @param {object} [comparatorOptions={}] - Optional options object passed to the comparator and Mr0 wrapper.
 * @returns {boolean} True if the sets are considered equivalent by the custom comparator, false otherwise.
 */
function areSetsEquivalentByCustomComparator(firstSet, secondSet, comparatorOptions = {}) {
  // Fast path: strict equality
  if (firstSet === secondSet) return true;

  // Wrap both inputs using Mr0, which provides a `.set` iterable
  const wrappedFirstSet = new Mr0(firstSet, comparatorOptions);
  const wrappedSecondSet = new Mr0(secondSet, comparatorOptions);

  let hasNonNullComparison = false;

  // Outer loop: iterate over each element in the first set
  outer: for (const firstElement of wrappedFirstSet.set) {
    // Inner loop: try to find a matching element in the second set
    for (const secondElement of wrappedSecondSet.set) {
      // areSemverRangesEquivalent returns a truthy value if the elements match, null/false otherwise
      const comparisonResult = areSemverRangesEquivalent(firstElement, secondElement, comparatorOptions);
      // Track if any comparison was non-null (i.e., a comparison was made)
      hasNonNullComparison = hasNonNullComparison || comparisonResult !== null;
      if (comparisonResult) {
        // Found a match for this element; move to next element in first set
        continue outer;
      }
    }
    // If handleMissingDoctypeError get here, no match was found for this element
    // If any comparison was non-null, sets are not equivalent
    if (hasNonNullComparison) return false;
  }

  // All elements in first set have matches in second set
  return true;
}

module.exports = areSetsEquivalentByCustomComparator;