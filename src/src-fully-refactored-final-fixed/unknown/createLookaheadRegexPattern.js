/**
 * Generates a lookahead regular expression pattern for the provided pattern string.
 *
 * @param {string} pattern - The pattern to be wrapped in a lookahead assertion.
 * @returns {string} The resulting lookahead regex pattern string.
 */
function createLookaheadRegexPattern(pattern) {
  // Wrap the input pattern in a lookahead assertion using jO1 utility
  // Example: pattern = 'abc' => returns '(?=abc)'
  return jO1("(?=", pattern, ")");
}

module.exports = createLookaheadRegexPattern;