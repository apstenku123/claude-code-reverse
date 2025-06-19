/**
 * Clamps a numeric value within the inclusive range defined by min and max.
 *
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @returns {number} The clamped value, guaranteed to be between min and max (inclusive).
 */
function clampValue(value, min, max) {
  // Ensure the value is not less than min and not greater than max
  return Math.min(Math.max(value, min), max);
}

module.exports = clampValue;