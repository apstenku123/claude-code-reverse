/**
 * Creates a positive lookahead regular expression string for the given pattern.
 *
 * This function uses `joinUl9TransformedStrings` to transform and concatenate the lookahead syntax parts
 * with the provided pattern, resulting in a string like '(?=pattern)'.
 *
 * @param {string} pattern - The regex pattern to be wrapped in a positive lookahead.
 * @returns {string} The resulting positive lookahead regex string.
 */
function createPositiveLookaheadRegex(pattern) {
  // Wrap the pattern in a positive lookahead using the joinUl9TransformedStrings utility
  return joinUl9TransformedStrings('(?=', pattern, ')');
}

module.exports = createPositiveLookaheadRegex;