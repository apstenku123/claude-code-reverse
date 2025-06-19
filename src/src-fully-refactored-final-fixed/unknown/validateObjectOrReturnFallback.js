/**
 * Validates the provided value and returns appropriate fallback constants if invalid.
 *
 * If the input is falsy (null, undefined, false, 0, "", etc.), returns the constant `wM6`.
 * If the input is not an object (e.g., a string, number, boolean, etc.), returns the constant `zM6`.
 * Otherwise, returns the input value itself (assumed to be a valid object).
 *
 * @param {any} valueToValidate - The value to validate as an object.
 * @returns {any} Returns `wM6` if the input is falsy, `zM6` if not an object, or the input itself if isBlobOrFileLikeObject'createInteractionAccessor a valid object.
 */
function validateObjectOrReturnFallback(valueToValidate) {
  // Return fallback if the value is falsy (null, undefined, false, etc.)
  if (!valueToValidate) {
    return wM6;
  }

  // Return fallback if the value is not an object
  if (typeof valueToValidate !== "object") {
    return zM6;
  }

  // Otherwise, return the object itself
  return valueToValidate;
}

module.exports = validateObjectOrReturnFallback;
