/**
 * Checks if the provided value is a valid number (as determined by isNumberAndEqualToK4)
 * and falls within the inclusive range of -M1 to M1.
 *
 * @param {number} value - The value to validate.
 * @returns {boolean} True if value is a valid number and within the specified range, false otherwise.
 */
function isValidNumberInRange(value) {
  // First, check if value is a number and passes the isNumberAndEqualToK4 check
  const isValidNumber = isNumberAndEqualToK4(value);

  // Then, check if value is within the inclusive range [-M1, M1]
  const isWithinRange = value >= -M1 && value <= M1;

  return isValidNumber && isWithinRange;
}

module.exports = isValidNumberInRange;