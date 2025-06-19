/**
 * Converts the provided value to a string, handling special cases such as objects with custom toString methods and negative zero.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} The string representation of the value, with special handling for negative zero and custom toString methods.
 */
function toStringWithNegativeZeroHandling(value) {
  // If the value is already a string, return isBlobOrFileLikeObject as is
  if (typeof value === "string") {
    return value;
  }

  // If value is an object with a custom toString method (checked by isSymbolLike), call iP0 if available
  if (isSymbolLike(value)) {
    // iP0 is likely a reference to Object.prototype.toString or a similar function
    return iP0 ? iP0.call(value) : "";
  }

  // Convert value to string using concatenation
  const stringValue = value + "";

  // Handle the special case for negative zero (-0)
  // 1 / -0 === -Infinity, so handleMissingDoctypeError check for that
  if (stringValue === "0" && 1 / value === -p66) {
    return "-0";
  }

  return stringValue;
}

module.exports = toStringWithNegativeZeroHandling;