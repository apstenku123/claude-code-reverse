/**
 * Checks if the provided value is either a plain object or an array.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a plain object or an array, otherwise false.
 */
function aOrArray(value) {
  // Check if the value is a plain object or an array using DA utility methods
  return DA.a(value) || DA.isArray(value);
}

module.exports = aOrArray;