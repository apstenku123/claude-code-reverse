/**
 * Checks if the provided string is a valid lowercase domain name segment.
 * The string must:
 *   - Start and end with a lowercase letter or digit
 *   - Contain only lowercase letters, digits, dots, or hyphens in between
 *   - Be at least two characters long
 *
 * @param {string} domainSegment - The string to validate as a domain name segment
 * @returns {boolean} True if the string is a valid lowercase domain name segment, false otherwise
 */
function isValidLowercaseDomainName(domainSegment) {
  // Regular expression explanation:
  // ^[a-z0-9]         : Starts with a lowercase letter or digit
  // [a-z0-9.\-]*   : Zero or more lowercase letters, digits, dots, or hyphens in the middle
  // [a-z0-9]$         : Ends with a lowercase letter or digit
  const lowercaseDomainPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
  return lowercaseDomainPattern.test(domainSegment);
}

module.exports = isValidLowercaseDomainName;