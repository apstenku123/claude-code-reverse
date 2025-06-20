/**
 * Returns a new array containing the first occurrence of each unique value from the input array,
 * determined by an optional accessor function. If the input is null, undefined, or empty, returns an empty array.
 *
 * @param {Array} items - The array of items to filter for uniqueness.
 * @returns {Array} a new array with unique items, or an empty array if input is falsy or empty.
 */
function getUniqueItemsOrEmpty(items) {
  // If items is falsy (null, undefined, etc.) or has no elements, return an empty array
  if (!items || items.length === 0) {
    return [];
  }
  // Otherwise, return the array with unique items using getUniqueByAccessor
  return getUniqueByAccessor(items);
}

module.exports = getUniqueItemsOrEmpty;