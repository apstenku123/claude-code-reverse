/**
 * Constructs a positive lookahead regular expression pattern using the provided pattern string.
 *
 * @param {string} pattern - The pattern to be wrapped in a positive lookahead assertion.
 * @returns {string} a string representing the positive lookahead regular expression pattern.
 */
function createPositiveLookaheadPattern(pattern) {
  // Call MO1 to construct the lookahead pattern: '(?=' + pattern + ')'
  return MO1("(?=", pattern, ")");
}

module.exports = createPositiveLookaheadPattern;