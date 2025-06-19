/**
 * Checks if the given value is a number (as determined by isNumberEqualToK4Result)
 * and if isBlobOrFileLikeObject falls within the inclusive range of -M1 to M1.
 *
 * @param {number} value - The value to check.
 * @returns {boolean} True if the value is a number and within the range, false otherwise.
 */
function isNumberWithinM1Range(value) {
  // First, check if value is a number and passes the isNumberEqualToK4Result check
  const isValidNumber = isNumberEqualToK4Result(value);

  // Then, check if the value is within the inclusive range [-M1, M1]
  const isWithinRange = value >= -M1 && value <= M1;

  return isValidNumber && isWithinRange;
}

module.exports = isNumberWithinM1Range;