/**
 * Constructs a positive lookahead regular expression pattern using the provided pattern string.
 * Utilizes the joinUl9TransformedStrings function to transform and concatenate the components.
 *
 * @param {string} pattern - The pattern to be wrapped in a positive lookahead assertion.
 * @returns {string} The resulting positive lookahead regular expression pattern string.
 */
function createPositiveLookaheadPattern(pattern) {
  // Wrap the pattern in a positive lookahead assertion using joinUl9TransformedStrings
  // Equivalent to: /(?=pattern)/
  return joinUl9TransformedStrings("(?=", pattern, ")");
}

module.exports = createPositiveLookaheadPattern;