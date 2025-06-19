/**
 * Generates a random floating-point number within the symmetric range [-maxAbsoluteValue, maxAbsoluteValue].
 *
 * @param {number} maxAbsoluteValue - The maximum absolute value for the random number range.
 * @returns {number} a random number between -maxAbsoluteValue and +maxAbsoluteValue.
 */
function getRandomNumberInSymmetricRange(maxAbsoluteValue) {
  // Math.random() returns a value in [0, 1).
  // Multiply by (2 * maxAbsoluteValue) to get a value in [0, 2*maxAbsoluteValue).
  // Subtract maxAbsoluteValue to shift the range to [-maxAbsoluteValue, maxAbsoluteValue).
  return Math.random() * (2 * maxAbsoluteValue) - maxAbsoluteValue;
}

module.exports = getRandomNumberInSymmetricRange;