/**
 * Replaces all non-alphanumeric characters in a string with hyphens.
 *
 * @param {string} inputString - The string to be sanitized.
 * @returns {string} The sanitized string with non-alphanumeric characters replaced by hyphens.
 */
function sanitizeStringToAlphanumericHyphens(inputString) {
  // Replace any character that is not a-z, a-zA, or 0-9 with a hyphen
  return inputString.replace(/[^a-zA-Z0-9]/g, "-");
}

module.exports = sanitizeStringToAlphanumericHyphens;