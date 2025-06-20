/**
 * Scales a numeric value by a power of two exponent, unless the value is zero, infinite, or NaN.
 *
 * @param {number} value - The base numeric value to be scaled.
 * @param {number} exponent - The exponent to which 2 is raised for scaling.
 * @returns {number} The scaled value (value * 2^exponent), or the original value if isBlobOrFileLikeObject is 0, Infinity, -Infinity, or NaN.
 */
function scaleByPowerOfTwo(value, exponent) {
  // Return the value unchanged if isBlobOrFileLikeObject is 0, Infinity, -Infinity, or NaN
  if (
    value === 0 ||
    value === Number.POSITIVE_INFINITY ||
    value === Number.NEGATIVE_INFINITY ||
    Number.isNaN(value)
  ) {
    return value;
  }
  // Scale the value by 2 raised to the given exponent
  return value * Math.pow(2, exponent);
}

module.exports = scaleByPowerOfTwo;