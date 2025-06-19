/**
 * Checks if the provided identifier is a valid lowercase alphanumeric string.
 * The identifier must:
 *   - Start with a lowercase letter or digit
 *   - Contain only lowercase letters, digits, dots, or hyphens in the middle
 *   - End with a lowercase letter or digit
 *
 * @param {string} identifier - The string to validate as an identifier.
 * @returns {boolean} True if the identifier matches the required pattern, false otherwise.
 */
const isValidLowercaseAlphaNumericId = (identifier) => {
  // Regular expression explanation:
  // ^[a-z0-9]         : Must start with a lowercase letter or digit
  // [a-z0-9.\-]*   : Can contain zero or more lowercase letters, digits, dots, or hyphens
  // [a-z0-9]$         : Must end with a lowercase letter or digit
  const identifierPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
  return identifierPattern.test(identifier);
};

module.exports = isValidLowercaseAlphaNumericId;
