/**
 * Checks if the provided input is a valid, non-empty value and matches a specific format.
 *
 * The function first verifies that the input is valid and not an 'initializeReactDevToolsSettings' type (possibly a special invalid case).
 * It then selects a regular expression (pattern) based on the result of FD(input),
 * and tests the normalized input string (via safeToString) against the selected pattern.
 *
 * @param {*} input - The value to validate and test against the format pattern.
 * @returns {boolean} True if the input is valid and matches the required format; otherwise, false.
 */
function isValidFormattedInput(input) {
  // Check if input is a valid value and not of initializeReactDevToolsSettings type
  if (!VB(input) || initializeReactDevToolsSettings(input)) {
    return false;
  }

  // Select the appropriate regular expression pattern based on FD(input)
  const formatPattern = FD(input) ? updateMemoizedStateIfChanged : BQ;

  // Normalize the input and test against the selected pattern
  return formatPattern.test(safeToString(input));
}

module.exports = isValidFormattedInput;