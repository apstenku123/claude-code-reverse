/**
 * Replaces all characters in the input string that are not alphanumeric, underscore, hyphen, or period with underscores.
 * This is useful for sanitizing strings to be used as filenames or identifiers.
 *
 * @param {string} inputString - The string to be sanitized.
 * @returns {string} The sanitized string with invalid characters replaced by underscores.
 */
function sanitizeStringForFilename(inputString) {
  // Replace any character that is not a word character, hyphen, or period with an underscore
  return inputString.replace(/[^\w.-]+/gi, "_");
}

module.exports = sanitizeStringForFilename;