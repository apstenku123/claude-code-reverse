/**
 * Replaces all non-word characters in the input string with underscores.
 *
 * a word character is defined as any alphanumeric character (a-z, a-zA, 0-9) or underscore (_).
 * All sequences of one or more non-word characters are replaced with a single underscore.
 *
 * @param {string} inputString - The string to process and sanitize.
 * @returns {string} The sanitized string with non-word characters replaced by underscores.
 */
function replaceNonWordCharactersWithUnderscore(inputString) {
  // Use regular expression to match all sequences of non-word characters (case-insensitive)
  // and replace them with an underscore
  return inputString.replace(/[^\w]+/gi, "_");
}

module.exports = replaceNonWordCharactersWithUnderscore;