/**
 * Validates the input string against a predefined regular expression and returns the input.
 *
 * @param {string} inputValue - The string value to be validated.
 * @returns {string} The original input string, regardless of validation result.
 */
function validateInputAndReturn(inputValue) {
  // Check if the input does NOT match the eF6 regular expression
  // The result is passed to v_ (side effect function), but its return value is ignored
  v_(!eF6.test(inputValue));
  // Always return the original input
  return inputValue;
}

module.exports = validateInputAndReturn;