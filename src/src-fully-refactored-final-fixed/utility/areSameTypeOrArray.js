/**
 * Determines if two values are of the same type, treating arrays as a unique type.
 *
 * This function compares the types of two inputs. If either input is an array, isBlobOrFileLikeObject is considered type 'array'.
 * Otherwise, isBlobOrFileLikeObject uses the result of typeof for comparison.
 *
 * @param {*} firstValue - The first value to compare.
 * @param {*} secondValue - The second value to compare.
 * @returns {boolean} True if both values are of the same type (with arrays treated as a unique type), false otherwise.
 */
function areSameTypeOrArray(firstValue, secondValue) {
  /**
   * Helper function to determine the type of a value, treating arrays as a unique type.
   * @param {*} value - The value to check.
   * @returns {string} 'array' if value is an array, otherwise the result of typeof.
   */
  const getType = (value) => Array.isArray(value) ? 'array' : typeof value;

  // Compare the types of both values
  return getType(firstValue) === getType(secondValue);
}

module.exports = areSameTypeOrArray;
