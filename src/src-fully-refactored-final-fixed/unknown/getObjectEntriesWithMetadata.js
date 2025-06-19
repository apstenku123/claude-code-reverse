/**
 * Returns an array of key-value-metadata triples for each own property of the input object.
 *
 * For each property in the input object, this function creates an array containing:
 *   - the property key
 *   - the property value
 *   - the result of passing the value to the A21 function (metadata)
 *
 * @param {Object} inputObject - The object whose own enumerable properties will be processed.
 * @returns {Array<Array>} An array where each element is an array of [key, value, metadata].
 */
function getObjectEntriesWithMetadata(inputObject) {
  // Get all own enumerable property keys of the input object
  const propertyKeys = _J(inputObject);
  const totalKeys = propertyKeys.length;

  // Iterate backwards through the property keys array
  for (let index = totalKeys - 1; index >= 0; index--) {
    const key = propertyKeys[index];
    const value = inputObject[key];
    // Replace the key in the array with [key, value, metadata]
    propertyKeys[index] = [key, value, A21(value)];
  }

  return propertyKeys;
}

module.exports = getObjectEntriesWithMetadata;