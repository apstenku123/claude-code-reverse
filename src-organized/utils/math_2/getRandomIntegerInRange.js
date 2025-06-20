/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} minValue - The minimum integer value in the range.
 * @param {number} maxValue - The maximum integer value in the range.
 * @returns {number} a random integer between minValue and maxValue (inclusive).
 */
function getRandomIntegerInRange(minValue, maxValue) {
  // Zg2() is assumed to return a random float in [0, 1)
  // Gg2() is assumed to floor the value to the nearest lower integer
  // The formula ensures the result is between minValue and maxValue, inclusive
  return minValue + Gg2(Zg2() * (maxValue - minValue + 1));
}

module.exports = getRandomIntegerInRange;