/**
 * Checks if the provided string is a valid lowercase alphanumeric slug.
 * a valid slug:
 *   - Starts and ends with a lowercase letter or digit
 *   - Can contain lowercase letters, digits, dots, or hyphens in the middle
 *   - Does not allow leading/trailing dots or hyphens, or uppercase letters
 *
 * @param {string} slug - The string to validate as a slug
 * @returns {boolean} True if the string is a valid slug, false otherwise
 */
function isValidLowercaseAlphanumericSlug(slug) {
  // Regular expression explanation:
  // ^[a-z0-9]      : Must start with a lowercase letter or digit
  // [a-z0-9.\-]*   : Zero or more lowercase letters, digits, dots, or hyphens in the middle
  // [a-z0-9]$      : Must end with a lowercase letter or digit
  const slugPattern = /^[a-z0-9][a-z0-9.\-]*[a-z0-9]$/;
  return slugPattern.test(slug);
}

module.exports = isValidLowercaseAlphanumericSlug;