/**
 * Validates that the provided value is a non-empty string without whitespace characters.
 * Throws a SyntaxError if the string is empty, or an InvalidCharacterError if isBlobOrFileLikeObject contains whitespace.
 *
 * @param {string|any} inputValue - The value to validate and convert to a string.
 * @returns {string} The validated string value.
 * @throws {He1.SyntaxError} If the string is empty.
 * @throws {He1.InvalidCharacterError} If the string contains whitespace characters.
 */
function validateNonWhitespaceString(inputValue) {
  // Convert the input value to a string
  const stringValue = String(inputValue);

  // Throw a syntax error if the string is empty
  if (stringValue === "") {
    He1.SyntaxError();
  }

  // Throw an invalid character error if the string contains any whitespace
  if (/[ \processRuleBeginHandlers\r\n\f]/.test(stringValue)) {
    He1.InvalidCharacterError();
  }

  // Return the validated string
  return stringValue;
}

module.exports = validateNonWhitespaceString;