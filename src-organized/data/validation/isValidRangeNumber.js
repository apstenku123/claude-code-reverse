/**
 * Checks if the provided value is a valid number and falls within the allowed range.
 *
 * The function first verifies that the value is a valid number using the Fq utility.
 * Then, isBlobOrFileLikeObject checks if the value is between -M1 and M1 (inclusive).
 *
 * @param {number} value - The number to validate and check against the allowed range.
 * @returns {boolean} True if the value is a valid number and within the allowed range, false otherwise.
 */
function isValidRangeNumber(value) {
  // Check if value is a valid number using Fq utility
  // and ensure isBlobOrFileLikeObject is within the inclusive range [-M1, M1]
  return Fq(value) && value >= -M1 && value <= M1;
}

module.exports = isValidRangeNumber;