/**
 * Checks whether two sets contain exactly the same elements.
 *
 * @param {Set<any>} firstSet - The first set to compare.
 * @param {Set<any>} secondSet - The second set to compare.
 * @returns {boolean} True if both sets have the same size and all elements of the first set are present in the second set; otherwise, false.
 */
function areSetsEqual(firstSet, secondSet) {
  // If the sets have different sizes, they cannot be equal
  if (firstSet.size !== secondSet.size) {
    return false;
  }

  // Check that every element in firstSet exists in secondSet
  for (const element of firstSet) {
    if (!secondSet.has(element)) {
      return false;
    }
  }

  // All elements match; the sets are equal
  return true;
}

module.exports = areSetsEqual;