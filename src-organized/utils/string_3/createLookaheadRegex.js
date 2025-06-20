/**
 * Creates a lookahead regular expression pattern for the given pattern string.
 *
 * This function wraps the provided pattern in a positive lookahead assertion using the concatenateSourceStrings utility.
 *
 * @param {string} pattern - The regex pattern to be wrapped in a lookahead assertion.
 * @returns {string} The resulting lookahead regex pattern string.
 */
function createLookaheadRegex(pattern) {
  // Use concatenateSourceStrings utility to wrap the pattern in a positive lookahead assertion
  return concatenateSourceStrings("(?=", pattern, ")");
}

module.exports = createLookaheadRegex;