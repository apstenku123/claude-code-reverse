/**
 * Replaces all characters in the input string that are not alphanumeric, underscore, or hyphen with underscores.
 * This is useful for sanitizing strings to be used as identifiers or filenames.
 *
 * @param {string} inputString - The string to be sanitized.
 * @returns {string} The sanitized string with invalid characters replaced by underscores.
 */
function sanitizeStringForIdentifier(inputString) {
  // Replace any character that is not a-z, a-zA, 0-9, underscore, or hyphen with an underscore
  return inputString.replace(/[^a-zA-Z0-9_-]/g, "_");
}

module.exports = sanitizeStringForIdentifier;