/**
 * Generates a random floating-point number in the range [0, 16).
 *
 * @returns {number} a random number greater than or equal to 0 and less than 16.
 */
const generateRandomNumberBetweenZeroAndSixteen = () => {
  // Math.random() returns a floating-point number in the range [0, 1).
  // Multiplying by 16 scales the range to [0, 16).
  return Math.random() * 16;
};

module.exports = generateRandomNumberBetweenZeroAndSixteen;
