/**
 * Filters out items from the input array that are present in the YG5 set.
 *
 * @param {Array} items - The array of items to be filtered.
 * @returns {Array} a new array containing only items not present in the YG5 set.
 */
function filterItemsNotInYG5(items) {
  // Return a new array with items that are NOT in the YG5 set
  return items.filter(item => !YG5.has(item));
}

module.exports = filterItemsNotInYG5;