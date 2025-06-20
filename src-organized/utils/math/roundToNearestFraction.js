/**
 * Rounds a given number to the nearest fraction based on the specified denominator.
 *
 * @param {number} value - The number to be rounded.
 * @param {number} denominator - The denominator that determines the fraction to round to (e.g., 2 for halves, 4 for quarters).
 * @returns {number} The value rounded to the nearest fraction as specified by the denominator.
 */
function roundToNearestFraction(value, denominator) {
  // Multiply the value by the denominator, round to the nearest integer,
  // then divide back by the denominator to get the rounded fraction
  return Math.round(value * denominator) / denominator;
}

module.exports = roundToNearestFraction;