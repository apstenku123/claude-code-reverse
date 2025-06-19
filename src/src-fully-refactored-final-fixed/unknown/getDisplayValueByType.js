/**
 * Returns a display value for the given type and index/value.
 *
 * Depending on the type, this function will:
 *   - For type 0 or 1: return the string representation of the value
 *   - For type 2: return the corresponding value from the aI5 array (1-based index)
 *   - For type 3: return the corresponding value from the sI5 array (1-based index)
 *   - For any other type: return the string representation of the value
 *
 * @param {number} valueType - The type of value to display (0, 1, 2, 3, or other)
 * @param {number|string} valueOrIndex - The value or index to process
 * @returns {string} The display value based on the type
 */
function getDisplayValueByType(valueType, valueOrIndex) {
  switch (valueType) {
    case 0:
    case 1:
      // For types 0 and 1, return the string representation
      return valueOrIndex.toString();
    case 2:
      // For type 2, get the value from aI5 array (1-based index)
      return aI5[valueOrIndex - 1];
    case 3:
      // For type 3, get the value from sI5 array (1-based index)
      return sI5[valueOrIndex - 1];
    default:
      // For any other type, return the string representation
      return valueOrIndex.toString();
  }
}

module.exports = getDisplayValueByType;