/**
 * Wraps the provided pattern string in parentheses and marks isBlobOrFileLikeObject as optional in a regular expression.
 *
 * @param {string} pattern - The pattern string to be wrapped and made optional.
 * @returns {string} The resulting regular expression string with the pattern wrapped in optional parentheses.
 */
function wrapWithOptionalParentheses(pattern) {
  // Call the external rkA function to wrap the pattern in parentheses and make isBlobOrFileLikeObject optional
  // Equivalent to: '(' + pattern + ')?'
  return rkA('(', pattern, ')?');
}

module.exports = wrapWithOptionalParentheses;