/**
 * Rounds a given number to the nearest multiple of the specified step.
 *
 * @param {number} value - The number to be rounded.
 * @param {number} step - The step to which the number should be rounded (e.g., 0.01 for two decimal places).
 * @returns {number} The number rounded to the nearest multiple of the step.
 */
function roundToNearestStep(value, step) {
  // Multiply the value by the step, round to the nearest integer, then divide by the step
  return Math.round(value * step) / step;
}

module.exports = roundToNearestStep;