/**
 * Determines if the provided value is an error-like object.
 *
 * An error-like object is defined as:
 *   - Passing the isObject utility check
 *   - Having a type (from getType) equal to ERROR_TYPE or AGGREGATE_ERROR_TYPE
 *   - OR having 'message' and 'name' properties of type string and not passing the isCustomError check
 *
 * @param {any} value - The value to check for error-like characteristics.
 * @returns {boolean} True if the value is error-like, false otherwise.
 */
function isErrorLikeObject(value) {
  // Check if value is a non-null object
  if (!isObject(value)) return false;

  // Get the type of the value
  const valueType = getType(value);

  // Check if the type matches known error types
  if (valueType === ERROR_TYPE || valueType === AGGREGATE_ERROR_TYPE) {
    return true;
  }

  // Check for 'message' and 'name' string properties and ensure isBlobOrFileLikeObject'createInteractionAccessor not a custom error
  const hasMessageAndName = typeof value.message === "string" && typeof value.name === "string";
  if (hasMessageAndName && !isCustomError(value)) {
    return true;
  }

  // Otherwise, not error-like
  return false;
}

module.exports = isErrorLikeObject;