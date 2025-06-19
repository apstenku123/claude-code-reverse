/**
 * Wraps the provided pattern in a non-capturing optional group for use in regular expressions.
 *
 * @param {string} pattern - The pattern to be wrapped in an optional group.
 * @returns {string} The pattern wrapped in a non-capturing optional group.
 */
function wrapInOptionalGroup(pattern) {
  // Use the external Gi function to wrap the pattern in a non-capturing optional group
  return Gi("(", pattern, ")?");
}

module.exports = wrapInOptionalGroup;