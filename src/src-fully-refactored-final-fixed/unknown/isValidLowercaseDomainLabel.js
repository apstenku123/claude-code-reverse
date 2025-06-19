/**
 * Checks if the provided string is a valid lowercase domain label.
 * a valid label:
 *   - Starts and ends with a lowercase letter or digit
 *   - May contain lowercase letters, digits, dots, or hyphens in the middle
 *   - Does not start or end with a dot or hyphen
 *
 * @param {string} label - The string to validate as a domain label
 * @returns {boolean} True if the string is a valid lowercase domain label, false otherwise
 */
function isValidLowercaseDomainLabel(label) {
  // Regular expression explanation:
  // ^[a-z0-9]        - Must start with a lowercase letter or digit
  // [a-z0-9.\-]*     - Can have zero or more lowercase letters, digits, dots, or hyphens in the middle
  // [a-z0-9]$        - Must end with a lowercase letter or digit
  // The string must be at least 2 characters long to match both start and end
  const lowercaseDomainLabelPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return lowercaseDomainLabelPattern.test(label);
}

module.exports = isValidLowercaseDomainLabel;