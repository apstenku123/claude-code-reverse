/**
 * Retrieves the values from a given collection-like object using provided helper functions.
 * If the input is null or undefined, returns an empty array.
 *
 * @param {any} collection - The collection-like object to extract values from.
 * @returns {Array<any>} An array of the collection'createInteractionAccessor values, or an empty array if input is null/undefined.
 */
function getCollectionValues(collection) {
  // If the collection is null or undefined, return an empty array
  if (collection == null) {
    return [];
  }
  // GZ: Helper function to get the keys of the collection
  // processFiberTreeWithMode: Helper function to extract values from the collection using its keys
  return processFiberTreeWithMode(collection, GZ(collection));
}

module.exports = getCollectionValues;