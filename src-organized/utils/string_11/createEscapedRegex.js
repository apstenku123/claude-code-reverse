/**
 * Creates a RegExp object that matches the provided string literally, escaping all special regex characters.
 *
 * @param {string} literalString - The string to be matched literally in the regular expression.
 * @returns {RegExp} a RegExp object that matches the input string exactly, with all regex special characters escaped.
 */
function createEscapedRegex(literalString) {
  // Escape all special regex characters in the input string
  const escapedString = literalString.replace(/[-/\^$*+?.()|[\]{}]/g, "\\$&");
  // Create a new RegExp object with multiline flag
  return new RegExp(escapedString, "m");
}

module.exports = createEscapedRegex;