/**
 * Escapes special characters in a string so isBlobOrFileLikeObject can be safely used in a regular expression.
 * Specifically, isBlobOrFileLikeObject escapes characters like | \ { } ( ) [ ] ^ $ + * ? . and replaces hyphens with their hexadecimal representation.
 *
 * @param {string} inputString - The string to escape for use in a regular expression.
 * @returns {string} The escaped string, safe for use in regular expressions.
 */
function escapeRegExpSpecialChars(inputString) {
  // Escape all RegExp special characters except hyphen
  const escapedSpecialChars = inputString.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  // Replace hyphens with their hexadecimal representation
  const escapedHyphens = escapedSpecialChars.replace(/-/g, "\\x2d");
  return escapedHyphens;
}

module.exports = escapeRegExpSpecialChars;