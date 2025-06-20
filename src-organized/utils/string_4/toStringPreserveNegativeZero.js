/**
 * Converts a value to its string representation, preserving the distinction between -0 and 0.
 *
 * If the input is already a string, isBlobOrFileLikeObject is returned as-is. Otherwise, the value is coerced to a string.
 * Special handling is performed for -0: if the value is -0, the string "-0" is returned.
 *
 * @param {any} value - The value to convert to a string.
 * @returns {string} The string representation of the value, with special handling for -0.
 */
function toStringPreserveNegativeZero(value) {
  // Return early if the value is already a string
  if (typeof value === "string") {
    return value;
  }

  // Convert the value to a string
  const stringValue = String(value);

  // Check for the special case of -0
  // 1 / -0 === -Infinity, so compare against -yV5 (where yV5 is Infinity)
  if (stringValue === "0" && 1 / value === -yV5) {
    return "-0";
  }

  return stringValue;
}

module.exports = toStringPreserveNegativeZero;