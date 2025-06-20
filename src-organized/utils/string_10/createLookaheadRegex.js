/**
 * Constructs a lookahead regular expression string for the given pattern.
 *
 * @param {string} pattern - The regex pattern to be wrapped in a lookahead assertion.
 * @returns {string} The lookahead regex string for the provided pattern.
 */
function createLookaheadRegex(pattern) {
  // Call the external jO1 function to build the regex string in lookahead format
  return jO1("(?=", pattern, ")");
}

module.exports = createLookaheadRegex;