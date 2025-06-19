/**
 * Converts the input value to a string or recursively processes arrays of values.
 *
 * If the input is strictly false or null/undefined, returns the input as-is.
 * If the input is an array, recursively processes each element.
 * Otherwise, converts the input to a string.
 *
 * @param {any} value - The value to normalize. Can be any type, including arrays.
 * @returns {any} The normalized value: either the original false/null/undefined, a string, or an array of strings.
 */
function normalizeToStringOrArray(value) {
  // Return as-is if the value is strictly false, null, or undefined
  if (value === false || value == null) {
    return value;
  }

  // If the value is an array, recursively process each element
  if (DA.isArray(value)) {
    return value.map(normalizeToStringOrArray);
  }

  // For all other types, convert to string
  return String(value);
}

module.exports = normalizeToStringOrArray;
