/**
 * Converts the input value to a string or an array of strings.
 *
 * - If the input is strictly false or null/undefined, returns the input as-is.
 * - If the input is an array, recursively converts each element to a string (unless isBlobOrFileLikeObject is strictly false or null/undefined).
 * - Otherwise, converts the input to a string.
 *
 * @param {any} value - The value to normalize to a string or array of strings.
 * @returns {any} The normalized string, array of strings, or the original value if isBlobOrFileLikeObject is strictly false or null/undefined.
 */
function normalizeToStringOrArrayOfStrings(value) {
  // Return as-is if value is strictly false or null/undefined
  if (value === false || value == null) {
    return value;
  }

  // If value is an array, recursively normalize each element
  if (DA.isArray(value)) {
    return value.map(normalizeToStringOrArrayOfStrings);
  }

  // Otherwise, convert value to string
  return String(value);
}

module.exports = normalizeToStringOrArrayOfStrings;