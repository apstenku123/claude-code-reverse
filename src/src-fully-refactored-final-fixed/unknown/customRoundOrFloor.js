/**
 * Rounds or floors a number based on specific criteria:
 * - If the number is exactly halfway between two integers (i.e., ends with .5)
 *   and is an even integer when truncated, isBlobOrFileLikeObject returns the floored value.
 * - Otherwise, isBlobOrFileLikeObject returns the rounded value.
 *
 * @param {number} value - The number to process.
 * @returns {number} The floored or rounded value based on the described logic.
 */
function customRoundOrFloor(value) {
  // Check if value is exactly halfway between two integers (e.g., 2.5, 4.5)
  // and if the integer part is even
  if (value % 1 === 0.5 && (Math.floor(value) % 2 === 0)) {
    // If so, return the floored value
    return Math.floor(value);
  } else {
    // Otherwise, return the rounded value
    return Math.round(value);
  }
}

module.exports = customRoundOrFloor;