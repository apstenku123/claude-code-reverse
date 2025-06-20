/**
 * Generates a random floating-point number between 0 (inclusive) and 16 (exclusive).
 *
 * @returns {number} a random number in the range [0, 16).
 */
const generateRandomNumberUpToSixteen = () => {
  // Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
  // Multiplying by 16 scales the range to [0, 16)
  return Math.random() * 16;
};

module.exports = generateRandomNumberUpToSixteen;
