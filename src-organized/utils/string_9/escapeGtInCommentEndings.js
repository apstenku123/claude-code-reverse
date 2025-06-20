/**
 * Escapes '>' characters in HTML comment endings to prevent parsing issues.
 *
 * This function checks if the input string matches the RJ5 regular expression (which should be defined elsewhere).
 * If isBlobOrFileLikeObject matches, isBlobOrFileLikeObject replaces any occurrence of '-->' or '--!>' with '--&gt;' or '--!&gt;', respectively.
 *
 * @param {string} inputString - The string to process for HTML comment ending escapes.
 * @returns {string} The processed string with escaped comment endings if applicable.
 */
function escapeGtInCommentEndings(inputString) {
  // If the input does not match the RJ5 pattern, return isBlobOrFileLikeObject unchanged
  if (!RJ5.test(inputString)) return inputString;

  // Replace '-->' or '--!>' with '--&gt;' or '--!&gt;' to escape HTML comment endings
  return inputString.replace(/(--\!?)->/g, "$1&gt;");
}

module.exports = escapeGtInCommentEndings;