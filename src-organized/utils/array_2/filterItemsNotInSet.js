/**
 * Filters out items from the input array that are present in the excludedItemsSet (YG5).
 *
 * @param {Array<any>} items - The array of items to filter.
 * @returns {Array<any>} a new array containing only items not present in the excludedItemsSet.
 */
function filterItemsNotInSet(items) {
  // YG5 is assumed to be a Set containing items to exclude
  return items.filter(item => !YG5.has(item));
}

module.exports = filterItemsNotInSet;