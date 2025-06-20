/**
 * Returns an array of elements from the provided collection-like object.
 * If the input is null or undefined, returns an empty array.
 *
 * @param {any} collection - The collection-like object to extract elements from.
 * @returns {Array} An array of elements from the collection, or an empty array if input is null/undefined.
 */
function getCollectionElements(collection) {
  // If the collection is null or undefined, return an empty array
  if (collection == null) {
    return [];
  }
  // lQ presumably gets the keys or indices of the collection
  // updateContextCurrentValue presumably maps the collection and its keys to an array of values
  return updateContextCurrentValue(collection, lQ(collection));
}

module.exports = getCollectionElements;