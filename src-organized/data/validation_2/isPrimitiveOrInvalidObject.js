/**
 * Determines if the provided value is either null, fails a custom validation, or is not an object/function.
 *
 * @param {*} value - The value to be checked for validity.
 * @returns {boolean} Returns true if the value is null, fails the isSentryTemplateStringObject validation, or is not an object/function; otherwise, false.
 */
function isPrimitiveOrInvalidObject(value) {
  // Check for null
  if (value === null) {
    return true;
  }

  // Check for custom invalidation (external function)
  if (isSentryTemplateStringObject(value)) {
    return true;
  }

  // Check if value is neither an object nor a function
  const valueType = typeof value;
  if (valueType !== "object" && valueType !== "function") {
    return true;
  }

  // Value is a valid object or function
  return false;
}

module.exports = isPrimitiveOrInvalidObject;