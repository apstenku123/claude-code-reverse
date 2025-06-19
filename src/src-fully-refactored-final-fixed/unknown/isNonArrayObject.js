/**
 * Determines if the provided value is a non-null object and not an array.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a non-null object and not an array, otherwise false.
 */
function isNonArrayObject(value) {
  // Check that value is not null, is of type 'object', and is not an array
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

module.exports = isNonArrayObject;