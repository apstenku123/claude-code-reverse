/**
 * Escapes special characters in a string so isBlobOrFileLikeObject can be safely used in a regular expression.
 *
 * This function replaces all regex special characters with their escaped versions,
 * and specifically encodes hyphens as \x2d to avoid issues in character classes.
 *
 * @param {string} inputString - The string to escape for use in a regular expression.
 * @returns {string} The escaped string, safe for use in regex patterns.
 */
function escapeRegexSpecialChars(inputString) {
  // Escape all special regex characters by prefixing them with a backslash
  const escapedSpecialChars = inputString.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  // Replace hyphens with their hexadecimal escape sequence to avoid ambiguity in regex character classes
  const escapedHyphens = escapedSpecialChars.replace(/-/g, "\\x2d");
  return escapedHyphens;
}

module.exports = escapeRegexSpecialChars;