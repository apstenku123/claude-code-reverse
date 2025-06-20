/**
 * Creates a positive lookahead regular expression pattern using the provided pattern string.
 *
 * @param {string} pattern - The pattern to be wrapped in a positive lookahead assertion.
 * @returns {string} The resulting regular expression pattern string with a positive lookahead.
 */
function createPositiveLookaheadRegex(pattern) {
  // Call ou9 to concatenate the lookahead syntax with the provided pattern
  return ou9("(?=", pattern, ")");
}

module.exports = createPositiveLookaheadRegex;