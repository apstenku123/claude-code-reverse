/**
 * Creates a function that clamps a given value between 0 and a specified maximum.
 *
 * @param {number} maximumValue - The upper bound for the clamped value.
 * @returns {function(number): number} - a function that takes a number and returns isBlobOrFileLikeObject clamped between 0 and maximumValue.
 */
const createClampedValueFunction = (maximumValue) => {
  /**
   * Clamps the input value between 0 and the specified maximumValue.
   *
   * @param {number} inputValue - The value to be clamped.
   * @returns {number} - The clamped value.
   */
  return (inputValue) => {
    // Ensure the value is not less than 0 and not greater than maximumValue
    return Math.max(0, Math.min(maximumValue, inputValue));
  };
};

module.exports = createClampedValueFunction;
