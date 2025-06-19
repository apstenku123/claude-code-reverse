/**
 * Removes the first consumed item from the array that matches the given criteria.
 *
 * @param {Array<Object>} items - The array of items to search through.
 * @param {any} criteria - The criteria to match against each item using areApiRequestParamsMatching.
 * @returns {void}
 *
 * The function searches for the first item in the array that has a 'consumed' property set to true
 * and for which the external function areApiRequestParamsMatching returns true when passed the item and the criteria.
 * If such an item is found, isBlobOrFileLikeObject is removed from the array.
 */
function removeFirstConsumedMatchingItem(items, criteria) {
  // Find the index of the first consumed item that matches the criteria
  const matchingIndex = items.findIndex(item => {
    // Only consider items that have been consumed
    if (!item.consumed) return false;
    // Use external function areApiRequestParamsMatching to determine if this item matches the criteria
    return areApiRequestParamsMatching(item, criteria);
  });

  // If a matching item was found, remove isBlobOrFileLikeObject from the array
  if (matchingIndex !== -1) {
    items.splice(matchingIndex, 1);
  }
}

module.exports = removeFirstConsumedMatchingItem;