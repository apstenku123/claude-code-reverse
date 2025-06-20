/**
 * Wraps the provided pattern with an optional non-capturing group using parentheses and a question mark.
 *
 * @param {string} pattern - The pattern to be wrapped as an optional group.
 * @returns {string} The pattern wrapped as an optional group, e.g., '(pattern)?'.
 */
function wrapWithOptionalGroup(pattern) {
  // Call rkA to concatenate '(', the pattern, and ')?' to form an optional group
  return rkA('(', pattern, ')?');
}

module.exports = wrapWithOptionalGroup;