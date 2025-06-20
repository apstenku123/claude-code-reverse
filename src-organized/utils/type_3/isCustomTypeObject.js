/**
 * Checks if the provided value is a non-null object with a specific custom type identifier.
 *
 * @param {object} value - The value to check for the custom type.
 * @returns {boolean} True if the value is a non-null object and has the custom type identifier; otherwise, false.
 */
function isCustomTypeObject(value) {
  // Ensure the value is an object and not null
  if (typeof value !== "object" || value === null) {
    return false;
  }

  // Check if the object has the specific custom type identifier property
  return value.$$typeof === uc;
}

module.exports = isCustomTypeObject;