/**
 * Wraps the provided pattern string in a positive lookahead regular expression construct.
 *
 * This function uses the combineClassNames utility to concatenate the lookahead syntax
 * with the provided pattern, resulting in a string like '(?=pattern)'.
 *
 * @param {string} pattern - The pattern string to be wrapped in a positive lookahead.
 * @returns {string} The resulting string with the pattern wrapped in a positive lookahead.
 */
function wrapWithPositiveLookahead(pattern) {
  // Use combineClassNames to concatenate the lookahead syntax with the pattern
  return combineClassNames("(?=", pattern, ")");
}

module.exports = wrapWithPositiveLookahead;