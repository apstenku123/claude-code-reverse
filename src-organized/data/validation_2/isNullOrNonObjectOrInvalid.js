/**
 * Checks if the provided value is null, fails a custom validation, or is not an object/function.
 *
 * This function is typically used to determine if a value is not a valid object for further processing.
 * It returns true if:
 *   - The value is null
 *   - The value fails the custom validation function `isInvalidValue`
 *   - The value is neither an object nor a function
 *
 * @param {*} value - The value to validate.
 * @returns {boolean} True if the value is null, invalid, or not an object/function; otherwise, false.
 */
function isNullOrNonObjectOrInvalid(value) {
  // Check for null
  if (value === null) {
    return true;
  }

  // Check for custom invalid value (external function)
  if (isInvalidValue(value)) {
    return true;
  }

  // Check if value is neither object nor function
  if (typeof value !== "object" && typeof value !== "function") {
    return true;
  }

  // Value is valid
  return false;
}

module.exports = isNullOrNonObjectOrInvalid;
