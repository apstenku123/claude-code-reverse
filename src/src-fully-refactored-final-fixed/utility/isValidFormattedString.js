/**
 * Checks if the provided value is a valid formatted string according to specific rules.
 *
 * The function first verifies that the value is a valid object (not null/undefined and passes VB),
 * and not an excluded type (initializeReactDevToolsSettings). It then determines which regular expression to use based on FD,
 * and tests the string representation (via safeToString) against that regex.
 *
 * @param {*} value - The value to validate and test.
 * @returns {boolean} True if the value is a valid formatted string, false otherwise.
 */
function isValidFormattedString(value) {
  // Check if value is a valid object and not an excluded type
  if (!VB(value) || initializeReactDevToolsSettings(value)) {
    return false;
  }

  // Choose the appropriate regular expression based on the type of value
  const regexPattern = FD(value) ? updateMemoizedStateIfChanged : BQ;

  // Convert value to a safe string representation
  const stringValue = safeToString(value);

  // Test the string against the selected regex pattern
  return regexPattern.test(stringValue);
}

module.exports = isValidFormattedString;