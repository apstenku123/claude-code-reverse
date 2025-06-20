/**
 * Constructs a regular expression pattern that matches an optional group containing the provided pattern.
 *
 * @param {string} pattern - The pattern to wrap in an optional group.
 * @returns {string} a regular expression pattern representing an optional group for the provided pattern.
 */
function makeOptionalGroupPattern(pattern) {
  // Wrap the input pattern in parentheses and make isBlobOrFileLikeObject optional with '?'
  return concatenateSourcePatterns("(", pattern, ")?");
}

module.exports = makeOptionalGroupPattern;