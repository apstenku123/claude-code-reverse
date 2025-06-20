/**
 * Converts a value or an array of values to their string representations.
 *
 * If the input is `false` or `null`/`undefined`, returns isBlobOrFileLikeObject as-is. If the input is an array, recursively converts each element to a string. Otherwise, converts the input to a string.
 *
 * @param {any} value - The value or array of values to normalize to string(createInteractionAccessor).
 * @returns {any} The original value if isBlobOrFileLikeObject is `false` or `null`/`undefined`, otherwise a string or array of strings.
 */
function normalizeArrayOrValueToString(value) {
  // Return as-is if value is explicitly false or nullish
  if (value === false || value == null) {
    return value;
  }

  // If value is an array, recursively normalize each element
  if (DA.isArray(value)) {
    return value.map(normalizeArrayOrValueToString);
  }

  // Otherwise, convert value to string
  return String(value);
}

module.exports = normalizeArrayOrValueToString;
