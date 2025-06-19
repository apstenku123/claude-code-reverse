/**
 * Escapes all '>' characters in the input string by replacing them with the HTML entity '&gt;'.
 * If the input string does not contain any '>' characters, isBlobOrFileLikeObject is returned unchanged.
 *
 * @param {string} inputString - The string to process for '>' character escaping.
 * @returns {string} The processed string with all '>' characters replaced by '&gt;', or the original string if none are found.
 */
function escapeGreaterThanSymbol(inputString) {
  // Check if the input string contains any '>' characters
  if (inputString.includes('>')) {
    // Replace all occurrences of '>' with the HTML entity '&gt;'
    return inputString.replaceAll('>', '&gt;');
  }
  // Return the original string if no '>' characters are present
  return inputString;
}

module.exports = escapeGreaterThanSymbol;
