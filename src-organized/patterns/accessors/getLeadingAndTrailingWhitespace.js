/**
 * Determines the leading and trailing whitespace for a given text node,
 * considering block elements, code formatting, and adjacent whitespace.
 *
 * @param {Object} sourceNode - The node whose whitespace is being analyzed. Should have properties:
 *   - isBlock {boolean}: Whether the node is a block element.
 *   - isCode {boolean}: Whether the node is a code element.
 *   - textContent {string}: The text content of the node.
 * @param {Object} context - Contextual information about the node'createInteractionAccessor environment. Should have properties:
 *   - preformattedCode {boolean}: Whether the context is within a preformatted code block.
 * @returns {Object} An object with 'leading' and 'trailing' string properties representing whitespace.
 */
function getLeadingAndTrailingWhitespace(sourceNode, context) {
  // If the node is a block element, or if isBlobOrFileLikeObject'createInteractionAccessor a code element within preformatted code,
  // there should be no leading or trailing whitespace.
  if (sourceNode.isBlock || (context.preformattedCode && sourceNode.isCode)) {
    return {
      leading: "",
      trailing: ""
    };
  }

  // Analyze the text content to determine whitespace details.
  const whitespaceInfo = JV5(sourceNode.textContent);

  // If the leading character is ASCII whitespace and there is adjacent whitespace on the left,
  // use the non-ASCII leading whitespace variant.
  if (whitespaceInfo.leadingAscii && hasAdjacentWhitespace("left", sourceNode, context)) {
    whitespaceInfo.leading = whitespaceInfo.leadingNonAscii;
  }

  // If the trailing character is ASCII whitespace and there is adjacent whitespace on the right,
  // use the non-ASCII trailing whitespace variant.
  if (whitespaceInfo.trailingAscii && hasAdjacentWhitespace("right", sourceNode, context)) {
    whitespaceInfo.trailing = whitespaceInfo.trailingNonAscii;
  }

  return {
    leading: whitespaceInfo.leading,
    trailing: whitespaceInfo.trailing
  };
}

module.exports = getLeadingAndTrailingWhitespace;