/**
 * Returns the provided value as a finite number if possible; otherwise, returns the specified default value.
 *
 * @param {number|string|null|undefined} value - The value to check and convert to a finite number.
 * @param {*} defaultValue - The value to return if the input is null, undefined, or not a finite number.
 * @returns {number|*} The finite number representation of the input value, or the default value if conversion is not possible.
 */
function getFiniteNumberOrDefault(value, defaultValue) {
  // Check if value is not null or undefined and can be converted to a finite number
  if (value != null && Number.isFinite(value = +value)) {
    return value;
  }
  // Return the default value if input is null, undefined, or not a finite number
  return defaultValue;
}

module.exports = getFiniteNumberOrDefault;