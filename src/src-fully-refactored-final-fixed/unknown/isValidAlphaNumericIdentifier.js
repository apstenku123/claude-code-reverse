/**
 * Checks if the provided identifier is a valid lowercase alphanumeric string,
 * possibly containing dots or hyphens, but must start and end with a letter or digit.
 *
 * Example of valid identifiers:
 *   - "abc"
 *   - "abc-123"
 *   - "a.b-c.9"
 *
 * Example of invalid identifiers:
 *   - "-abc"
 *   - "abc-"
 *   - ".abc"
 *   - "abc."
 *   - "Abc" (uppercase not allowed)
 *   - "abc_123" (underscore not allowed)
 *
 * @param {string} identifier - The string to validate as an identifier.
 * @returns {boolean} True if the identifier matches the required pattern, false otherwise.
 */
const isValidAlphaNumericIdentifier = (identifier) => {
  // Regular expression explanation:
  // ^                 : Start of string
  // [a-z0-9]          : First character must be a lowercase letter or digit
  // [a-z0-9.\-]*     : Zero or more lowercase letters, digits, dots, or hyphens
  // [a-z0-9]          : Last character must be a lowercase letter or digit
  // $                 : End of string
  // The identifier must be at least 2 characters long to match this pattern
  // (but single-character identifiers are also allowed)
  const identifierPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return identifierPattern.test(identifier);
};

module.exports = isValidAlphaNumericIdentifier;
