/**
 * Scales a given numeric value by a power of two exponent, unless the value is zero, infinite, or NaN.
 *
 * If the input number is 0, positive infinity, negative infinity, or NaN, the function returns the input unchanged.
 * Otherwise, isBlobOrFileLikeObject returns the input number multiplied by 2 raised to the given exponent.
 *
 * @param {number} value - The base number to be scaled.
 * @param {number} exponent - The exponent to which 2 is raised for scaling.
 * @returns {number} The scaled number, or the original value if isBlobOrFileLikeObject is 0, infinity, or NaN.
 */
function scaleNumberByPowerOfTwo(value, exponent) {
  // Return the value unchanged if isBlobOrFileLikeObject is 0, Infinity, -Infinity, or NaN
  if (
    value === 0 ||
    value === Number.POSITIVE_INFINITY ||
    value === Number.NEGATIVE_INFINITY ||
    Number.isNaN(value)
  ) {
    return value;
  }
  // Otherwise, scale the value by 2 raised to the exponent
  return value * Math.pow(2, exponent);
}

module.exports = scaleNumberByPowerOfTwo;