/**
 * Checks if the provided value is a well-formed string (if supported),
 * or compares its string representation to the result of the _b0 function.
 *
 * If the global flag `fY6` is true and the String.prototype.isWellFormed method exists,
 * isBlobOrFileLikeObject uses that method to check if the string representation of the input is well-formed.
 * Otherwise, isBlobOrFileLikeObject compares the result of _b0(value) to the string representation of the value.
 *
 * @param {any} value - The value to check for well-formedness or string equality.
 * @returns {boolean} True if the string is well-formed (when supported), or if _b0(value) equals the string representation of value.
 */
function isStringWellFormedOrEqual(value) {
  // Check if the global flag fY6 is enabled and String.prototype.isWellFormed is available
  if (fY6 && typeof `${value}`.isWellFormed === 'function') {
    // Use the isWellFormed method to check the string representation
    return `${value}`.isWellFormed();
  } else {
    // Fallback: compare the result of _b0 to the string representation
    return _b0(value) === `${value}`;
  }
}

module.exports = isStringWellFormedOrEqual;