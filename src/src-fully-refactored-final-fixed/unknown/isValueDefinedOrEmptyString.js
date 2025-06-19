/**
 * Checks if the provided value is defined (not null or undefined) or is an empty string.
 *
 * This function is useful for cases where an empty string ('') should be considered as a valid value,
 * in addition to any other truthy value.
 *
 * @param {any} value - The value to check for definition or empty string.
 * @returns {boolean} Returns true if the value is truthy or exactly an empty string, otherwise false.
 */
function isValueDefinedOrEmptyString(value) {
  // Returns true if value is truthy (not null, undefined, 0, false, etc.)
  // or if value is exactly an empty string ('')
  return Boolean(value || value === "");
}

module.exports = isValueDefinedOrEmptyString;