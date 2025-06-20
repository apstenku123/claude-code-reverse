/**
 * Checks if the provided string is a valid slug.
 * a valid slug:
 *   - Starts and ends with a lowercase letter or digit
 *   - May contain lowercase letters, digits, dots, or hyphens in between
 *   - Does not start or end with a dot or hyphen
 *
 * @param {string} slug - The string to validate as a slug
 * @returns {boolean} True if the string is a valid slug, false otherwise
 */
function isValidSlug(slug) {
  // Regex explanation:
  // ^[a-z0-9]        -> Must start with a lowercase letter or digit
  // [a-z0-9.\-]*     -> Can have zero or more lowercase letters, digits, dots, or hyphens in the middle
  // [a-z0-9]$        -> Must end with a lowercase letter or digit
  const slugPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return slugPattern.test(slug);
}

module.exports = isValidSlug;