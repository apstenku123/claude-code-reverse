/**
 * Maps each own property of the input object to an array containing the key, its value, and a transformed value.
 *
 * @param {Object} inputObject - The object whose own enumerable property keys and values will be mapped.
 * @returns {Array<Array>} An array where each element is an array of [key, value, transformedValue].
 *
 * The transformation for each value is performed by the external function A21.
 */
function mapObjectKeysToValueAndTransformedValue(inputObject) {
  // Get all own enumerable property keys of the input object
  const objectKeys = _J(inputObject);
  const keyCount = objectKeys.length;

  // Iterate over each key in reverse order
  for (let index = keyCount - 1; index >= 0; index--) {
    const key = objectKeys[index];
    const value = inputObject[key];
    // Replace the key in the array with [key, value, transformedValue]
    objectKeys[index] = [key, value, A21(value)];
  }

  return objectKeys;
}

module.exports = mapObjectKeysToValueAndTransformedValue;