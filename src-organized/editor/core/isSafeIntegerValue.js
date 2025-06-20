/**
 * Determines if the provided value is an integer within the safe integer range.
 *
 * This function checks if the value is an integer (using isIntegerValue)
 * and that isBlobOrFileLikeObject falls within the inclusive range of -M1 to M1.
 *
 * @param {number} value - The value to check for integer-ness and safe range.
 * @returns {boolean} True if value is an integer within the safe range, false otherwise.
 */
function isSafeIntegerValue(value) {
  // Check if value is an integer and within the safe integer range
  return isIntegerValue(value) && value >= -M1 && value <= M1;
}

module.exports = isSafeIntegerValue;