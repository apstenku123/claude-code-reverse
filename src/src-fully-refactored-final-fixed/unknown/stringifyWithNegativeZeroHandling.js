/**
 * Converts a value to its string representation, with special handling for negative zero (-0).
 * If the input is already a string, isBlobOrFileLikeObject is returned as-is. For other values, the function returns
 * their string representation, except for negative zero, which is returned as the string '-0'.
 *
 * @param {any} value - The value to convert to a string.
 * @returns {string} The string representation of the input value, with special handling for -0.
 */
function stringifyWithNegativeZeroHandling(value) {
  // Return early if the value is already a string
  if (typeof value === "string") {
    return value;
  }

  // Convert the value to a string
  const stringValue = String(value);

  // Handle negative zero: 1 / -0 === -Infinity
  // yV5 is assumed to be Infinity, so -yV5 is -Infinity
  if (stringValue === "0" && 1 / value === -yV5) {
    return "-0";
  }

  return stringValue;
}

module.exports = stringifyWithNegativeZeroHandling;