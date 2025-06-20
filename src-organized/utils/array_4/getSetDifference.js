/**
 * Returns a new Set containing elements that are present in the first set but not in the second set.
 *
 * @param {Set<any>} sourceSet - The set from which elements will be compared and filtered.
 * @param {Set<any>} exclusionSet - The set containing elements to exclude from the source set.
 * @returns {Set<any>} a new set with elements from sourceSet that are not in exclusionSet.
 */
function getSetDifference(sourceSet, exclusionSet) {
  // Convert sourceSet to an array and filter out elements that exist in exclusionSet
  const differenceArray = [...sourceSet].filter(element => !exclusionSet.has(element));
  // Create a new Set from the filtered array
  return new Set(differenceArray);
}

module.exports = getSetDifference;