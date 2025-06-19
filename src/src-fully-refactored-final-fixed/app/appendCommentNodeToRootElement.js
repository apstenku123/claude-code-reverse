/**
 * Appends a comment node to the root (first) open element in the element stack.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulations. Must have an _appendCommentNode method and openElements.items array.
 * @param {any} commentNode - The comment node to append.
 * @returns {void}
 */
function appendCommentNodeToRootElement(domHandler, commentNode) {
  // The root element is assumed to be the first item in the openElements stack
  const rootElement = domHandler.openElements.items[0];
  // Append the comment node to the root element using the handler'createInteractionAccessor method
  domHandler._appendCommentNode(commentNode, rootElement);
}

module.exports = appendCommentNodeToRootElement;