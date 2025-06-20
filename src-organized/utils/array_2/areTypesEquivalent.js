/**
 * Determines if two values are of the same type, treating arrays as a distinct type from objects.
 *
 * @param {*} firstValue - The first value to compare.
 * @param {*} secondValue - The second value to compare.
 * @returns {boolean} True if both values are of the same type (with arrays considered as 'array'), false otherwise.
 */
function areTypesEquivalent(firstValue, secondValue) {
  /**
   * Returns a string representing the type of the value.
   * Arrays are identified as 'array', all other types use typeof.
   *
   * @param {*} value - The value whose type is to be determined.
   * @returns {string} The type of the value ('array', 'object', 'string', etc.).
   */
  const getType = (value) => Array.isArray(value) ? 'array' : typeof value;

  // Compare the types of both values
  return getType(firstValue) === getType(secondValue);
}

module.exports = areTypesEquivalent;