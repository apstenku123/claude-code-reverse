/**
 * Returns a new array containing only the first occurrence of each unique value from the input array.
 * Uniqueness is determined by an optional accessor function. If the input is null, undefined, or empty, returns an empty array.
 *
 * @param {Array} items - The array to filter for unique values.
 * @returns {Array} a new array with only unique items, or an empty array if input is falsy or empty.
 */
function getUniqueItems(items) {
  // If items is falsy (null/undefined) or has no elements, return an empty array
  if (!items || items.length === 0) {
    return [];
  }
  // Otherwise, return the array with unique items using getUniqueByAccessor
  return getUniqueByAccessor(items);
}

module.exports = getUniqueItems;