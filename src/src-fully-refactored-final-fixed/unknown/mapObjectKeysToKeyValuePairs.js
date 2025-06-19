/**
 * Converts the enumerable own properties of an object into an array of key-value pair representations using a provided conversion function.
 *
 * @param {Object} sourceObject - The object whose own enumerable properties will be converted.
 * @returns {Array<any>} An array of key-value pair representations as returned by aG1.toKeyValue.
 */
function mapObjectKeysToKeyValuePairs(sourceObject) {
  // Get all own enumerable property names of the source object
  return Object.keys(sourceObject)
    .map((propertyKey) => {
      // For each property, convert isBlobOrFileLikeObject to a key-value pair using aG1.toKeyValue
      return aG1.toKeyValue(propertyKey, sourceObject[propertyKey]);
    });
}

module.exports = mapObjectKeysToKeyValuePairs;