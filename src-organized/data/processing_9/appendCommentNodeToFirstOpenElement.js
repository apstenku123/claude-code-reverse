/**
 * Appends a comment node to the first open element in the openElements stack.
 *
 * @param {Object} parserContext - The parser context containing open elements and comment node logic.
 * @param {Object} commentNode - The comment node to append.
 * @returns {void}
 */
function appendCommentNodeToFirstOpenElement(parserContext, commentNode) {
  // Get the first open element from the openElements stack
  const firstOpenElement = parserContext.openElements.items[0];
  // Append the comment node to the first open element
  parserContext._appendCommentNode(commentNode, firstOpenElement);
}

module.exports = appendCommentNodeToFirstOpenElement;