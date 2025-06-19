/**
 * Checks if the provided resource name is valid according to specific rules:
 * - Must start and end with a lowercase letter or digit
 * - Can contain lowercase letters, digits, dots (.), or hyphens (-) in between
 *
 * @param {string} resourceName - The resource name to validate
 * @returns {boolean} True if the resource name is valid, false otherwise
 */
function isValidResourceName(resourceName) {
  // Regular expression explanation:
  // ^[a-z0-9]           : Starts with a lowercase letter or digit
  // [a-z0-9.\-]*     : Followed by zero or more lowercase letters, digits, dots, or hyphens
  // [a-z0-9]$           : Ends with a lowercase letter or digit
  const resourceNamePattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return resourceNamePattern.test(resourceName);
}

module.exports = isValidResourceName;