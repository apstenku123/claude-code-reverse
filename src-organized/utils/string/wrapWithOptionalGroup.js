/**
 * Wraps the provided pattern string in an optional non-capturing group using parentheses and a question mark.
 *
 * For example, if the input is 'abc', the output will be '(abc)?'.
 *
 * @param {string} pattern - The pattern string to be wrapped as an optional group.
 * @returns {string} The pattern wrapped in an optional group.
 */
function wrapWithOptionalGroup(pattern) {
  // Call the external Ii function to concatenate the group syntax with the pattern
  return Ii("(", pattern, ")?");
}

module.exports = wrapWithOptionalGroup;