/**
 * Validates the provided value and returns appropriate fallbacks if invalid.
 *
 * If the input is falsy (null, undefined, false, 0, "", etc.), returns the default fallback value `wM6`.
 * If the input is not an object (e.g., a string, number, boolean, etc.), returns the type fallback value `zM6`.
 * Otherwise, returns the input object itself.
 *
 * @param {any} valueToValidate - The value to validate as an object.
 * @returns {any} - Returns `wM6` if input is falsy, `zM6` if input is not an object, or the input object itself.
 */
function validateOrFallbackObject(valueToValidate) {
  // Return default fallback if input is falsy
  if (!valueToValidate) {
    return wM6;
  }

  // Return type fallback if input is not an object
  if (typeof valueToValidate !== "object") {
    return zM6;
  }

  // Input is a valid object; return as is
  return valueToValidate;
}

module.exports = validateOrFallbackObject;
