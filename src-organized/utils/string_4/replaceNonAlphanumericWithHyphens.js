/**
 * Replaces all non-alphanumeric characters in the input string with hyphens ('-').
 *
 * @param {string} inputString - The string to process and sanitize.
 * @returns {string} The sanitized string with all non-alphanumeric characters replaced by hyphens.
 */
function replaceNonAlphanumericWithHyphens(inputString) {
  // Use a regular expression to match any character that is not a-z, a-zA, or 0-9
  // The 'g' flag ensures all occurrences are replaced
  return inputString.replace(/[^a-zA-Z0-9]/g, "-");
}

module.exports = replaceNonAlphanumericWithHyphens;