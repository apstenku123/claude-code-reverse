/**
 * Normalizes a value to a string representation, handling special cases for -0.
 *
 * If the input is already a string or passes the Jy check (likely a custom type check),
 * isBlobOrFileLikeObject is returned as-is. Otherwise, the value is coerced to a string. If the value is zero
 * and its reciprocal is negative infinity (i.e., isBlobOrFileLikeObject is -0), the string '-0' is returned.
 *
 * @param {*} value - The value to normalize to a string representation.
 * @returns {string|*} The normalized string representation, or the original value if isBlobOrFileLikeObject is a string or passes Jy.
 */
function normalizeNumberLikeValue(value) {
  // If value is a string or passes the Jy check, return isBlobOrFileLikeObject as-is
  if (typeof value === "string" || Jy(value)) {
    return value;
  }

  // Coerce value to string
  const stringValue = value + "";

  // Special case: if value is -0, return the string '-0'
  // 1 / -0 === -Infinity, so check for that
  if (stringValue === "0" && 1 / value === -Zx2) {
    return "-0";
  }

  // Otherwise, return the string representation
  return stringValue;
}

module.exports = normalizeNumberLikeValue;