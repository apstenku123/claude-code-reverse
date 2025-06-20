/**
 * Creates a multiline regular expression from a string, escaping all special regex characters.
 *
 * @param {string} patternString - The string to convert into a regular expression pattern.
 * @returns {RegExp} a RegExp object that matches the exact input string, with special characters escaped, using multiline mode.
 */
function createEscapedMultilineRegExp(patternString) {
  // Escape all special regex characters in the input string
  const escapedPattern = patternString.replace(/[-/\^$*+?.()|[\]{}]/g, "\\$&");
  // Create a new RegExp object with multiline flag
  return new RegExp(escapedPattern, "m");
}

module.exports = createEscapedMultilineRegExp;