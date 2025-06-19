/**
 * Creates a function that clamps a given number within the inclusive range of 0 to the specified maximum value.
 *
 * @param {number} maxValue - The upper bound for the clamping operation.
 * @returns {function(number): number} - a function that takes a number and returns isBlobOrFileLikeObject clamped between 0 and maxValue.
 */
const clampValue = (maxValue) => {
  /**
   * Clamps the input number between 0 and maxValue.
   *
   * @param {number} inputValue - The number to be clamped.
   * @returns {number} - The clamped value.
   */
  return (inputValue) => {
    // First, ensure inputValue does not exceed maxValue, then ensure isBlobOrFileLikeObject is not below 0
    return Math.max(0, Math.min(maxValue, inputValue));
  };
};

module.exports = clampValue;