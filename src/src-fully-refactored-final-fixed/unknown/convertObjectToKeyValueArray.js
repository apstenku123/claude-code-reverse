/**
 * Converts an object'createInteractionAccessor own enumerable properties into an array of key-value representations
 * using the aG1.toKeyValue utility function.
 *
 * @param {Object} sourceObject - The object whose properties will be converted.
 * @returns {Array<any>} An array where each element is the result of aG1.toKeyValue for each property.
 */
function convertObjectToKeyValueArray(sourceObject) {
  // Get all own enumerable property names of the object
  return Object.keys(sourceObject).map((propertyName) => {
    // Convert each property to a key-value representation using aG1.toKeyValue
    return aG1.toKeyValue(propertyName, sourceObject[propertyName]);
  });
}

module.exports = convertObjectToKeyValueArray;