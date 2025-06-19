/**
 * Determines if two sets (or set-like objects) are equivalent using a custom comparator function.
 * This function wraps each input in a Mr0 instance (which is assumed to expose a `.set` iterable),
 * then checks if every element in the first set has a matching element in the second set according to areSemverRangesEquivalent.
 *
 * @param {any} firstSet - The first set or set-like object to compare.
 * @param {any} secondSet - The second set or set-like object to compare.
 * @param {object} [options={}] - Optional configuration or context passed to Mr0 and areSemverRangesEquivalent.
 * @returns {boolean} True if the sets are considered equivalent, false otherwise.
 */
function areSetsEquivalentWithCustomComparator(firstSet, secondSet, options = {}) {
  // If the references are strictly equal, they are equivalent
  if (firstSet === secondSet) return true;

  // Wrap both inputs in Mr0, which provides a `.set` iterable
  const wrappedFirstSet = new Mr0(firstSet, options);
  const wrappedSecondSet = new Mr0(secondSet, options);

  let foundNonNullComparison = false;

  // Outer loop: for each element in the first set
  setComparison: for (const elementA of wrappedFirstSet.set) {
    // Inner loop: try to find a matching element in the second set
    for (const elementB of wrappedSecondSet.set) {
      // areSemverRangesEquivalent is a custom comparator; returns truthy if elements match, null/false otherwise
      const comparisonResult = areSemverRangesEquivalent(elementA, elementB, options);
      // Track if any comparison was not null
      foundNonNullComparison = foundNonNullComparison || comparisonResult !== null;
      // If a match is found, continue with the next elementA
      if (comparisonResult) continue setComparison;
    }
    // If handleMissingDoctypeError found at least one non-null comparison but no match for elementA, sets are not equivalent
    if (foundNonNullComparison) return false;
  }

  // All elements matched or no non-null comparisons were found; sets are equivalent
  return true;
}

module.exports = areSetsEquivalentWithCustomComparator;