/**
 * Wraps a given pattern or string with a positive lookahead regular expression construct.
 *
 * This function delegates to the external `ou9` function, passing the lookahead prefix '(?=',
 * the provided pattern, and the lookahead suffix ')'.
 *
 * @param {string} pattern - The pattern or string to be wrapped in a positive lookahead.
 * @returns {string} The result of passing the lookahead-wrapped pattern to `ou9`.
 */
function wrapWithPositiveLookahead(pattern) {
  // Call ou9 with the positive lookahead prefix, the pattern, and the suffix
  return ou9("(?=", pattern, ")");
}

module.exports = wrapWithPositiveLookahead;