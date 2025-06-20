/**
 * Determines whether the given value is an array.
 * Uses Array.isArray if available; otherwise, falls back to Object.prototype.toString.
 *
 * @param {*} value - The value to check for array-ness.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
function isArrayValue(value) {
  // Use native Array.isArray if available for best performance and accuracy
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  // Fallback: Use Object.prototype.toString to check for array
  // BD2 is assumed to be Object.prototype.toString
  return BD2.call(value) === "[object Array]";
}

module.exports = isArrayValue;