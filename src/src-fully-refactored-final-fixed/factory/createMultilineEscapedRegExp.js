/**
 * Creates a multiline RegExp object from a string, escaping all special regex characters.
 *
 * @param {string} pattern - The string pattern to convert into a RegExp. All special regex characters will be escaped.
 * @returns {RegExp} a new RegExp object with the 'm' (multiline) flag.
 */
function createMultilineEscapedRegExp(pattern) {
  // Escape all special regex characters in the pattern string
  const escapedPattern = pattern.replace(/[-/\^$*+?.()|[\]{}]/g, "\\$&");
  // Create and return a RegExp object with the multiline flag
  return new RegExp(escapedPattern, "m");
}

module.exports = createMultilineEscapedRegExp;