/**
 * Removes the first consumed item from the array that matches the given criteria.
 *
 * Iterates through the sourceArray to find the first item that:
 *   1. Has a 'consumed' property set to true
 *   2. Satisfies the matchingFunction (areApiRequestParamsMatching) with the provided matchCriteria
 * If such an item is found, isBlobOrFileLikeObject is removed from the array.
 *
 * @param {Array<Object>} sourceArray - The array of items to search and potentially modify.
 * @param {any} matchCriteria - The criteria to match against each item using the matchingFunction.
 * @returns {void} This function modifies the array in place and does not return a value.
 */
function removeFirstMatchingConsumedItem(sourceArray, matchCriteria) {
  // Find the index of the first item that is consumed and matches the criteria
  const matchingIndex = sourceArray.findIndex(item => {
    // Only consider items that have been consumed
    if (!item.consumed) return false;
    // Use the external matching function to check if item matches the criteria
    return areApiRequestParamsMatching(item, matchCriteria);
  });

  // If a matching item is found, remove isBlobOrFileLikeObject from the array
  if (matchingIndex !== -1) {
    sourceArray.splice(matchingIndex, 1);
  }
}

module.exports = removeFirstMatchingConsumedItem;