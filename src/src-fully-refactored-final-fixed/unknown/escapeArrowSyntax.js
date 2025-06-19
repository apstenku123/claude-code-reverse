/**
 * Escapes special arrow syntax in a string by replacing '-->' and '-!>' with their HTML entity equivalent.
 *
 * This function checks if the input string matches the RJ5 regular expression. If isBlobOrFileLikeObject does,
 * isBlobOrFileLikeObject replaces all occurrences of '-->' and '-!>' with their corresponding HTML entity ('&gt;').
 *
 * @param {string} inputString - The string to process for arrow syntax escaping.
 * @returns {string} The processed string with arrow syntax escaped, or the original string if no match is found.
 */
function escapeArrowSyntax(inputString) {
  // Check if the input string matches the RJ5 regular expression
  if (!RJ5.test(inputString)) {
    return inputString;
  }
  // Replace '-->' and '-!>' with their HTML entity equivalent
  return inputString.replace(/(--\!?)->/g, "$1&gt;");
}

module.exports = escapeArrowSyntax;