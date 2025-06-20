/**
 * Escapes special characters in a string so isBlobOrFileLikeObject can be safely used in a regular expression.
 * Specifically, isBlobOrFileLikeObject escapes characters like | \ { } ( ) [ ] ^ $ + * ? . and replaces hyphens with their hex code.
 *
 * @param {string} inputString - The string to escape for use in a regular expression.
 * @returns {string} The escaped string, safe for use in a regular expression.
 */
function escapeRegexSpecialCharacters(inputString) {
  // Escape all regex special characters by prefixing them with a backslash
  const escapedSpecialChars = inputString.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  // Replace hyphens with their hexadecimal representation to avoid regex range issues
  const escapedHyphens = escapedSpecialChars.replace(/-/g, "\\x2d");
  return escapedHyphens;
}

module.exports = escapeRegexSpecialCharacters;