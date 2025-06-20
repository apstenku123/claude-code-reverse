/**
 * Checks if the provided value is strictly equal to the global value `q`.
 *
 * @param {*} valueToCompare - The value to compare against the global value `q`.
 * @returns {boolean} True if `valueToCompare` is strictly equal to `q`, otherwise false.
 */
function isEqualToGlobalValue(valueToCompare) {
  // Compare the provided value to the global value 'q'
  return q === valueToCompare;
}

module.exports = isEqualToGlobalValue;
