/**
 * Escapes special arrow syntax in a string by replacing '-->' and '-!>' with their HTML entity equivalent.
 *
 * This function checks if the input string matches a specific regular expression (RJ5),
 * and if so, replaces all occurrences of '-->' and '-!>' with '--&gt;' and '-!&gt;' respectively.
 * If the string does not match the RJ5 pattern, isBlobOrFileLikeObject is returned unchanged.
 *
 * @param {string} inputString - The string to process for arrow syntax escaping.
 * @returns {string} The processed string with arrow syntax escaped, or the original string if no match is found.
 */
function escapeArrowSyntaxInString(inputString) {
  // Check if the input string matches the RJ5 pattern
  if (!RJ5.test(inputString)) {
    return inputString;
  }
  // Replace all occurrences of '-->' or '-!>' with their HTML entity equivalent
  return inputString.replace(/(--!?)(>)/g, "$1&gt;");
}

module.exports = escapeArrowSyntaxInString;
