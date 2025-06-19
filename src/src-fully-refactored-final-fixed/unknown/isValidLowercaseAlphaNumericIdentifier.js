/**
 * Checks if the provided identifier is valid: must start and end with a lowercase letter or digit,
 * and may contain lowercase letters, digits, dots, or hyphens in between.
 *
 * @param {string} identifier - The string to validate as an identifier.
 * @returns {boolean} True if the identifier matches the required pattern, false otherwise.
 */
const isValidLowercaseAlphaNumericIdentifier = (identifier) => {
  // Regular expression explanation:
  // ^                : Start of string
  // [a-z0-9]         : First character must be a lowercase letter or digit
  // [a-z0-9.\-]*     : Zero or more lowercase letters, digits, dots, or hyphens
  // [a-z0-9]         : Last character must be a lowercase letter or digit
  // $                : End of string
  const identifierPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return identifierPattern.test(identifier);
};

module.exports = isValidLowercaseAlphaNumericIdentifier;
