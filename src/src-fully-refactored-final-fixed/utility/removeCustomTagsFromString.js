/**
 * Removes all occurrences of specific custom tags and their contents from a string.
 *
 * The tags to be removed are defined in the global ZG5 array. The function constructs a regular expression
 * that matches any opening tag from ZG5, any content inside (including newlines), and the corresponding closing tag.
 * It then removes all such matches from the input string and trims the result.
 *
 * @param {string} inputString - The string from which to remove the custom tags and their contents.
 * @returns {string} The input string with all specified custom tags and their contents removed, trimmed of whitespace.
 */
function removeCustomTagsFromString(inputString) {
  // Build a regular expression that matches any tag in ZG5 and its content
  // Example: if ZG5 = ['foo', 'bar'], the regex will match <foo>...</foo> and <bar>...</bar>
  const customTagsPattern = `<(${ZG5.join("|")})>.*?</\\1>\n?`;
  const customTagsRegex = new RegExp(customTagsPattern, "gs");

  // Remove all matching tags and their contents, then trim whitespace
  return inputString.replace(customTagsRegex, "").trim();
}

module.exports = removeCustomTagsFromString;