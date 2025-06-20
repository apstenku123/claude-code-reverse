/**
 * Determines if the provided value is null, matches a special condition (as defined by isSentryTemplateStringObject),
 * or is neither an object nor a function.
 *
 * @param {*} value - The value to be checked.
 * @returns {boolean} True if the value is null, matches the special condition, or is neither an object nor a function; otherwise, false.
 */
function isNotObjectOrFunctionOrIsSpecial(value) {
  // Check if the value is null
  if (value === null) {
    return true;
  }

  // Check if the value matches a special condition (as defined by isSentryTemplateStringObject)
  if (isSentryTemplateStringObject(value)) {
    return true;
  }

  // Check if the value is neither an object nor a function
  const valueType = typeof value;
  if (valueType !== "object" && valueType !== "function") {
    return true;
  }

  // Otherwise, the value is an object or function and does not match the special condition
  return false;
}

module.exports = isNotObjectOrFunctionOrIsSpecial;