/**
 * Checks if the provided name is a valid lowercase alphanumeric string.
 * The name must:
 *   - Start and end with a lowercase letter or digit
 *   - Contain only lowercase letters, digits, dots, or hyphens in between
 *
 * @param {string} name - The string to validate
 * @returns {boolean} True if the name matches the required pattern, false otherwise
 */
function isValidLowercaseAlphanumericName(name) {
  // Regular expression explanation:
  // ^[a-z0-9]      : Starts with a lowercase letter or digit
  // [a-z0-9.\-]*   : Followed by zero or more lowercase letters, digits, dots, or hyphens
  // [a-z0-9]$      : Ends with a lowercase letter or digit
  const lowercaseAlphanumericPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return lowercaseAlphanumericPattern.test(name);
}

module.exports = isValidLowercaseAlphanumericName;