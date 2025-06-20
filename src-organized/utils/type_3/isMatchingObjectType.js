/**
 * Checks if the provided value is a non-null object and if its type, as determined by IR9, matches the expected type GR9.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if value is a non-null object and IR9(value) equals GR9, otherwise false.
 */
function isMatchingObjectType(value) {
  // Ensure value is not null and is of type 'object'
  if (value && typeof value === "object") {
    // Check if the object'createInteractionAccessor type, as determined by IR9, matches GR9
    return IR9(value) === GR9;
  }
  return false;
}

module.exports = isMatchingObjectType;