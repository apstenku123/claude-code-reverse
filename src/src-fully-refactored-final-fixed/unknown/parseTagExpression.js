/**
 * Parses a tag expression from the given input, extracting the tag name, expression, and related metadata.
 *
 * @param {string} input - The source string to parse from.
 * @param {number} startIndex - The index in the input string to start parsing from.
 * @param {boolean} hasColonPrefix - Whether to handle colon-prefixed tag names specially.
 * @param {string} [delimiter=">"] - The delimiter to use when parsing (default is '>').
 * @returns {object|undefined} An object containing the parsed tag name, expression, and metadata, or undefined if parsing fails.
 */
function parseTagExpression(input, startIndex, hasColonPrefix, delimiter = ">") {
  // Attempt to extract tag data using the extractDelimitedString helper function
  const tagData = extractDelimitedString(input, startIndex + 1, delimiter);
  if (!tagData) return;

  let {
    data: rawTagExpression,
    index: closeIndex
  } = tagData;

  // Find the first whitespace in the tag expression
  const firstWhitespaceIndex = rawTagExpression.search(/\s/);
  let tagName = rawTagExpression;
  let tagExp = rawTagExpression;
  let attrExpPresent = true;

  // If whitespace is found, split into tagName and tagExp
  if (firstWhitespaceIndex !== -1) {
    tagName = rawTagExpression.substring(0, firstWhitespaceIndex);
    tagExp = rawTagExpression.substring(firstWhitespaceIndex + 1).trimStart();
  }

  const rawTagName = tagName;

  // If colon prefix handling is enabled, process accordingly
  if (hasColonPrefix) {
    const colonIndex = tagName.indexOf(":");
    if (colonIndex !== -1) {
      // Remove the prefix up to and including the colon
      tagName = tagName.substr(colonIndex + 1);
      // Determine if the tagName was changed compared to the original data
      attrExpPresent = tagName !== tagData.data.substr(colonIndex + 1);
    }
  }

  return {
    tagName,         // The parsed tag name (possibly without colon prefix)
    tagExp,          // The tag expression (attributes, etc.)
    closeIndex,      // The index in the input where the tag closes
    attrExpPresent,  // Boolean indicating if attribute expression is present
    rawTagName       // The original tag name before colon prefix removal
  };
}

module.exports = parseTagExpression;