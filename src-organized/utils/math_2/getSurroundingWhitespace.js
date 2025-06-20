/**
 * Determines the leading and trailing whitespace to use for a given text node,
 * considering block elements, code formatting, and adjacent whitespace.
 *
 * @param {Object} sourceNode - The DOM node whose whitespace is being determined.
 * @param {Object} formattingContext - Context object containing formatting flags (e.g., preformattedCode).
 * @returns {Object} An object with 'leading' and 'trailing' string properties representing whitespace.
 */
function getSurroundingWhitespace(sourceNode, formattingContext) {
  // If the node is a block element, or if isBlobOrFileLikeObject'createInteractionAccessor code within a preformatted block, no extra whitespace is needed
  if (
    sourceNode.isBlock ||
    (formattingContext.preformattedCode && sourceNode.isCode)
  ) {
    return {
      leading: "",
      trailing: ""
    };
  }

  // Analyze the text content for leading/trailing ASCII and non-ASCII whitespace
  const whitespaceInfo = JV5(sourceNode.textContent);

  // If leading whitespace is ASCII and there is adjacent whitespace to the left, use the non-ASCII version
  if (
    whitespaceInfo.leadingAscii &&
    hasAdjacentWhitespace("left", sourceNode, formattingContext)
  ) {
    whitespaceInfo.leading = whitespaceInfo.leadingNonAscii;
  }

  // If trailing whitespace is ASCII and there is adjacent whitespace to the right, use the non-ASCII version
  if (
    whitespaceInfo.trailingAscii &&
    hasAdjacentWhitespace("right", sourceNode, formattingContext)
  ) {
    whitespaceInfo.trailing = whitespaceInfo.trailingNonAscii;
  }

  return {
    leading: whitespaceInfo.leading,
    trailing: whitespaceInfo.trailing
  };
}

module.exports = getSurroundingWhitespace;