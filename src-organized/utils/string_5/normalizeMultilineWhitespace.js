/**
 * Replaces consecutive newline characters (with optional following whitespace) in a string
 * with a single newline character. Useful for normalizing multi-line strings by collapsing
 * multiple blank lines and removing trailing whitespace after newlines.
 *
 * @param {string} inputText - The string to normalize.
 * @returns {string} The normalized string with consecutive newlines collapsed.
 */
function normalizeMultilineWhitespace(inputText) {
  // If inputText is falsy (null, undefined, empty), return an empty string
  if (!inputText) {
    return "";
  }

  // Replace one or more occurrences of (newline(createInteractionAccessor) followed by optional whitespace)
  // with a single newline character
  return inputText.replace(/(\n+\s*)+/g, '\n');
}

module.exports = normalizeMultilineWhitespace;