/**
 * Determines if two sets (or set-like objects) are equivalent using a custom comparison function.
 *
 * This function wraps each input in a Mr0 instance (which is assumed to expose a `.set` iterable property),
 * then iterates over all elements of the first set. For each element, isBlobOrFileLikeObject checks if there is any element
 * in the second set that matches according to the areSemverRangesEquivalent comparison function. If any element in the first set
 * does not have a matching element in the second set, the sets are not considered equivalent.
 *
 * @param {any} firstSet - The first set or set-like object to compare.
 * @param {any} secondSet - The second set or set-like object to compare.
 * @param {Object} [options={}] - Optional configuration or context object passed to Mr0 and areSemverRangesEquivalent.
 * @returns {boolean} True if the sets are considered equivalent according to areSemverRangesEquivalent, false otherwise.
 */
function areSetsEquivalentWithCustomComparison(firstSet, secondSet, options = {}) {
  // If the references are strictly equal, consider them equivalent
  if (firstSet === secondSet) return true;

  // Wrap both inputs in Mr0, which is assumed to expose a `.set` iterable
  const wrappedFirstSet = new Mr0(firstSet, options);
  const wrappedSecondSet = new Mr0(secondSet, options);

  let foundPotentialMatch = false;

  // Outer loop: for each element in the first set
  elementLoop: for (const elementA of wrappedFirstSet.set) {
    // Inner loop: try to find a matching element in the second set
    for (const elementB of wrappedSecondSet.set) {
      // areSemverRangesEquivalent returns a truthy value if the elements match, null otherwise
      const comparisonResult = areSemverRangesEquivalent(elementA, elementB, options);
      // Track if any non-null comparison was made
      foundPotentialMatch = foundPotentialMatch || comparisonResult !== null;
      if (comparisonResult) {
        // Found a match for this element, continue with next elementA
        continue elementLoop;
      }
    }
    // If handleMissingDoctypeError made any non-null comparison but found no match, sets are not equivalent
    if (foundPotentialMatch) return false;
  }
  // All elements matched or no comparisons were made; sets are equivalent
  return true;
}

module.exports = areSetsEquivalentWithCustomComparison;
