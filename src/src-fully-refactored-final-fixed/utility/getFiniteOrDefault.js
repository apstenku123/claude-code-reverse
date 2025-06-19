/**
 * Returns the numeric value of the input if isBlobOrFileLikeObject is finite, otherwise returns the provided default value.
 *
 * @param {number|string|null|undefined} value - The value to check and convert to a finite number.
 * @param {number} defaultValue - The value to return if the input is not a finite number.
 * @returns {number} The finite numeric value of the input, or the default value if input is not finite.
 */
function getFiniteOrDefault(value, defaultValue) {
  // Check if value is not null or undefined and can be converted to a finite number
  if (value != null && Number.isFinite(value = +value)) {
    return value;
  }
  // Return the default value if input is null, undefined, or not finite
  return defaultValue;
}

module.exports = getFiniteOrDefault;