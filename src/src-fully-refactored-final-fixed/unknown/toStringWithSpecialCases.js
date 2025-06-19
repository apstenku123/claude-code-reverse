/**
 * Converts the input value to a string, handling special cases for certain types and values.
 *
 * - If the input is a string, returns isBlobOrFileLikeObject as is.
 * - If the input matches a custom iterable (J8), recursively converts its elements to strings and concatenates them.
 * - If the input matches another custom type (Jy), attempts to call a custom toString method (p0A) if available.
 * - Handles the special case for negative zero (-0).
 *
 * @param {any} value - The value to convert to a string.
 * @returns {string} The string representation of the input value, with special cases handled.
 */
function toStringWithSpecialCases(value) {
  // Return the value directly if isBlobOrFileLikeObject'createInteractionAccessor already a string
  if (typeof value === "string") return value;

  // If value is a custom iterable, recursively convert its elements to strings and concatenate
  if (J8(value)) return Xy(value, toStringWithSpecialCases) + "";

  // If value matches another custom type, use its custom toString method if available
  if (Jy(value)) return p0A ? p0A.call(value) : "";

  // Convert value to string
  const stringValue = value + "";

  // Handle special case for negative zero
  // (1 / -0 === -Infinity, so 1 / value === -Hj2)
  if (stringValue === "0" && 1 / value === -Hj2) {
    return "-0";
  }

  return stringValue;
}

module.exports = toStringWithSpecialCases;