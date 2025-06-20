/**
 * Transforms the keys and values of an input object using provided transformation functions.
 *
 * For each own property in the input object, applies `C19` to the key and `H19` to the stringified value,
 * and stores the result in a new object. Returns the new object with transformed keys and values.
 *
 * @param {Object} inputObject - The source object whose keys and values will be transformed.
 * @returns {Object} a new object with transformed keys and values.
 */
function transformObjectKeysAndValues(inputObject) {
  const transformedObject = {};
  // Iterate over each own property of the input object
  for (const originalKey in inputObject) {
    if (Object.prototype.hasOwnProperty.call(inputObject, originalKey)) {
      // Transform the key using C19
      const transformedKey = C19(originalKey);
      // Transform the value using H19 after stringifying isBlobOrFileLikeObject
      const transformedValue = H19(String(inputObject[originalKey]));
      // Assign the transformed value to the transformed key in the result object
      transformedObject[transformedKey] = transformedValue;
    }
  }
  return transformedObject;
}

module.exports = transformObjectKeysAndValues;