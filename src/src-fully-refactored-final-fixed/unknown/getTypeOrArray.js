/**
 * Determines if the provided value is an array or returns its JavaScript type as a string.
 *
 * @param {any} value - The value to check the type of.
 * @returns {string} Returns 'array' if the value is an array, otherwise returns the result of typeof.
 */
function getTypeOrArray(value) {
  // Check if the value is an array
  if (Array.isArray(value)) {
    return "array";
  }
  // Return the JavaScript type of the value
  return typeof value;
}

module.exports = getTypeOrArray;