/**
 * Checks if the provided value is a non-null object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an object and not null, otherwise false.
 */
function isNonNullObject(value) {
  // Ensure the value is not null and its type is 'object'
  return value !== null && typeof value === "object";
}

module.exports = isNonNullObject;