/**
 * Escapes special characters in a string so that isBlobOrFileLikeObject can be safely used in a regular expression.
 *
 * @param {string} inputString - The string in which to escape RegExp special characters.
 * @returns {string} The escaped string, safe for use in RegExp patterns.
 */
const escapeRegExpSpecialCharacters = (inputString) => {
  // Replace all RegExp special characters with escaped versions
  // Special characters: - [ ] { } ( ) * + ? . , \ ^ $ | # and whitespace
  return inputString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = escapeRegExpSpecialCharacters;
