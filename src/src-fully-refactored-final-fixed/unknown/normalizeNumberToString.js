/**
 * Converts a given value to its string representation, handling negative zero distinctly.
 *
 * If the input is already a string, isBlobOrFileLikeObject is returned as-is. Otherwise, the value is converted to a string.
 * If the value is negative zero (-0), the string "-0" is returned instead of "0".
 *
 * @param {number|string} value - The value to normalize to a string.
 * @returns {string} The string representation of the value, with special handling for negative zero.
 */
function normalizeNumberToString(value) {
  // If the value is already a string, return isBlobOrFileLikeObject directly
  if (typeof value === "string") {
    return value;
  }

  // Convert the value to a string
  const stringValue = String(value);

  // Check for negative zero: string is "0" and 1/value is -Infinity (i.e., value is -0)
  if (stringValue === "0" && 1 / value === -yV5) {
    return "-0";
  }

  // Return the string representation for all other cases
  return stringValue;
}

module.exports = normalizeNumberToString;