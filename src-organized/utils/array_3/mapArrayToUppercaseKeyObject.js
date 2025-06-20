/**
 * Converts an array of values into an object where each key is the uppercase string representation
 * of the value (with hyphens and periods replaced by underscores), and each value is the original value.
 * Falsy values in the array are skipped.
 *
 * @param {Array<any>} valuesArray - The array of values to map into an object.
 * @returns {Object} An object mapping transformed keys to their original values.
 */
function mapArrayToUppercaseKeyObject(valuesArray) {
  const mappedObject = {};
  const arrayLength = valuesArray.length;

  for (let index = 0; index < arrayLength; index++) {
    const currentValue = valuesArray[index];
    // Only process truthy values
    if (currentValue) {
      // Convert value to string, uppercase, and replace '-' and '.' with '_'
      const transformedKey = String(currentValue)
        .toUpperCase()
        .replace(/[-.]/g, "_");
      mappedObject[transformedKey] = currentValue;
    }
  }

  return mappedObject;
}

module.exports = mapArrayToUppercaseKeyObject;