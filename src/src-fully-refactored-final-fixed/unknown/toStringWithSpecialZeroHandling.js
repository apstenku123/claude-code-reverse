/**
 * Converts the input value to a string, handling special cases for objects, custom toString methods, and negative zero.
 *
 * @param {any} value - The value to convert to a string.
 * @returns {string} The string representation of the input value, with special handling for negative zero and custom object conversions.
 */
function toStringWithSpecialZeroHandling(value) {
  // Return the value directly if isBlobOrFileLikeObject'createInteractionAccessor already a string
  if (typeof value === "string") {
    return value;
  }

  // If value is an object with a custom conversion (J8), use Xy to convert recursively
  if (J8(value)) {
    return String(Xy(value, toStringWithSpecialZeroHandling));
  }

  // If value is an object with a custom toString (Jy), use p0A if available
  if (Jy(value)) {
    return p0A ? p0A.call(value) : "";
  }

  // Default conversion to string
  const stringValue = String(value);

  // Special handling for negative zero: if value is 0 and 1/value is -Infinity, return "-0"
  if (stringValue === "0" && 1 / value === -Hj2) {
    return "-0";
  }

  return stringValue;
}

module.exports = toStringWithSpecialZeroHandling;