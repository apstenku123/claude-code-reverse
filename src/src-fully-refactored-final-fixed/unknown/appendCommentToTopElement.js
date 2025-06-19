/**
 * Appends a comment node with the given text to the top DOM element.
 * If a certain condition is met (X6 and isMatchingElementOrMappedValue), isBlobOrFileLikeObject uses a callback to create the comment node.
 * Otherwise, isBlobOrFileLikeObject appends the comment directly, handling HTMLTemplateElement content if necessary.
 *
 * @param {string} commentText - The text to use for the comment node.
 * @returns {void}
 */
function appendCommentToTopElement(commentText) {
  // Retrieve the top DOM element from the global 'x' object
  let topElement = isRegExpObject.top;

  // If the global flag X6 is true and isMatchingElementOrMappedValue returns true for (topElement, _u), use the callback approach
  if (X6 && isMatchingElementOrMappedValue(topElement, _u)) {
    // getFunctionPointerHandler is a callback function that receives an object (initializeWithPayload) with a createComment method
    getFunctionPointerHandler(function (commentCreator) {
      return commentCreator.createComment(commentText);
    });
  } else {
    // If the top element is an HTMLTemplateElement, use its content property
    if (topElement instanceof p5.HTMLTemplateElement) {
      topElement = topElement.content;
    }
    // Append the comment node to the element using a custom _appendChild method
    topElement._appendChild(topElement.ownerDocument.createComment(commentText));
  }
}

module.exports = appendCommentToTopElement;