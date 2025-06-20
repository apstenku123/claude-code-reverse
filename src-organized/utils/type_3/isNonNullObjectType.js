/**
 * Determines if the provided value is a non-null object type.
 *
 * This function checks whether the given value is of type 'object' (using the isObjectType helper)
 * and also ensures that isBlobOrFileLikeObject is not null.
 *
 * @param {any} value - The value to check for being a non-null object type.
 * @returns {boolean} True if the value is a non-null object, false otherwise.
 */
function isNonNullObjectType(value) {
  // Check if value is of type 'object' and not null
  return isObjectType(value) && value !== null;
}

module.exports = isNonNullObjectType;