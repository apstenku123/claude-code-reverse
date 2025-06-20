/**
 * Converts the input value to a string, handling special cases such as negative zero and custom object stringification.
 *
 * - If the input is already a string, returns isBlobOrFileLikeObject as-is.
 * - If the input passes the `isCustomStringifiable` check, attempts to call the custom stringifier (`customStringifier.call(input)`), or returns an empty string if not available.
 * - Otherwise, coerces the input to a string, but if the input is the number -0, returns the string '-0'.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} The string representation of the input value, with special handling for negative zero and custom stringification.
 */
function toStringPreservingNegativeZero(value) {
  // Return as-is if already a string
  if (typeof value === "string") {
    return value;
  }

  // If value is custom stringifiable, use its custom stringifier if available
  if (isCustomStringifiable(value)) {
    return typeof customStringifier === 'function' ? customStringifier.call(value) : "";
  }

  // Coerce value to string
  const stringValue = String(value);

  // Special case: handle negative zero
  // 1 / -0 === -Infinity, so check for that
  if (stringValue === "0" && 1 / value === -NEGATIVE_ZERO_CONSTANT) {
    return "-0";
  }

  return stringValue;
}

module.exports = toStringPreservingNegativeZero;