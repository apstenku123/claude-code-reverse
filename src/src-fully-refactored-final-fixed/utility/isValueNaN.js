/**
 * Determines if the provided value is NaN (Not-a-Number).
 *
 * In JavaScript, NaN is the only value that is not equal to itself.
 * This function leverages that property to check if a value is NaN.
 *
 * @param {*} value - The value to test for NaN.
 * @returns {boolean} True if the value is NaN; otherwise, false.
 */
const isValueNaN = (value) => {
  // NaN is the only value in JavaScript that is not equal to itself
  return value !== value;
};

module.exports = isValueNaN;
