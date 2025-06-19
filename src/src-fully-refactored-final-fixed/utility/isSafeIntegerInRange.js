/**
 * Checks if the provided value is an integer and falls within the safe integer range.
 *
 * @param {number} value - The value to validate as a safe integer.
 * @returns {boolean} True if the value is an integer within the safe integer range; otherwise, false.
 */
function isSafeIntegerInRange(value) {
  // Check if value is an integer using isIntegerValue utility
  // and if isBlobOrFileLikeObject is within the inclusive range of -M1 to M1
  return isIntegerValue(value) && value >= -M1 && value <= M1;
}

module.exports = isSafeIntegerInRange;