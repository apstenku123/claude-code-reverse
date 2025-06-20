/**
 * Determines if the provided value is a plain object (i.e., not null, of type 'object', and not an array).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a plain object, otherwise false.
 */
function a(value) {
  // Check that value is not null, is of type 'object', and is not an array
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

module.exports = a;
