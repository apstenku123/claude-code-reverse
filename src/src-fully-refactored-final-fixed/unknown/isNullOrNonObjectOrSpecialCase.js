/**
 * Determines if the provided value is null, a special case as defined by isSentryTemplateStringObject, or not an object/function.
 *
 * @param {*} value - The value to be checked.
 * @returns {boolean} True if the value is null, is a special case (as determined by isSentryTemplateStringObject), or is not an object/function; otherwise, false.
 */
function isNullOrNonObjectOrSpecialCase(value) {
  // Check if value is null
  if (value === null) {
    return true;
  }

  // Check if value matches a special case as defined by isSentryTemplateStringObject
  if (isSentryTemplateStringObject(value)) {
    return true;
  }

  // Check if value is neither an object nor a function
  const valueType = typeof value;
  if (valueType !== "object" && valueType !== "function") {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isNullOrNonObjectOrSpecialCase;