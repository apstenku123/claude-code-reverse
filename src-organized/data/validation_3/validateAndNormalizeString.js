/**
 * Validates and normalizes a string input for further processing.
 * Throws a SyntaxError if the input is an empty string.
 * Throws an InvalidCharacterError if the input contains whitespace characters.
 * Returns the normalized string if valid.
 *
 * @param {string|any} inputValue - The value to validate and normalize.
 * @returns {string} The validated and normalized string.
 * @throws {He1.SyntaxError} If the input is an empty string after conversion.
 * @throws {He1.InvalidCharacterError} If the input contains whitespace characters.
 */
function validateAndNormalizeString(inputValue) {
  // Convert input to string for validation
  const normalizedString = String(inputValue);

  // Throw a SyntaxError if the string is empty
  if (normalizedString === "") {
    He1.SyntaxError();
  }

  // Throw an InvalidCharacterError if the string contains any whitespace
  if (/[ \processRuleBeginHandlers\r\n\f]/.test(normalizedString)) {
    He1.InvalidCharacterError();
  }

  // Return the validated, normalized string
  return normalizedString;
}

module.exports = validateAndNormalizeString;