/**
 * Generates a random floating-point number within a specified range [min, max).
 *
 * @param {number} min - The lower bound of the range (inclusive).
 * @param {number} max - The upper bound of the range (exclusive).
 * @returns {number} a random floating-point number greater than or equal to min and less than max.
 */
function getRandomNumberInRange(min, max) {
  // Math.random() returns a float in [0, 1), so scaling and shifting gives [min, max)
  return Math.random() * (max - min) + min;
}

module.exports = getRandomNumberInRange;