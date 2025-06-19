/**
 * Appends a comment node with the specified text to the appropriate DOM context.
 * If a special rendering mode is enabled (X6) and the context matches a certain condition (isMatchingElementOrMappedValue),
 * isBlobOrFileLikeObject uses a custom comment creation mechanism. Otherwise, isBlobOrFileLikeObject appends the comment directly to the DOM.
 *
 * @param {string} commentText - The text content for the comment node to be created and appended.
 * @returns {void}
 */
function appendCommentNode(commentText) {
  // Get the top-level DOM context
  let domContext = x.top;

  // If special rendering mode is enabled and the context matches a specific type
  if (X6 && isMatchingElementOrMappedValue(domContext, _u)) {
    // Use the custom comment creation mechanism
    getFunctionPointerHandler(function (customContext) {
      return customContext.createComment(commentText);
    });
  } else {
    // If the context is an HTMLTemplateElement, use its content as the context
    if (domContext instanceof p5.HTMLTemplateElement) {
      domContext = domContext.content;
    }
    // Append the comment node directly to the DOM context
    domContext._appendChild(domContext.ownerDocument.createComment(commentText));
  }
}

module.exports = appendCommentNode;