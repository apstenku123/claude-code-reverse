/**
 * Appends a comment node with the provided text to the top-level element in the DOM context.
 * Handles special cases for HTMLTemplateElement and conditional logic based on global flags.
 *
 * @param {string} commentText - The text content for the comment node to be appended.
 * @returns {void}
 */
function appendCommentNodeToTopElement(commentText) {
  // Retrieve the top-level element from the context object 'x'
  let topElement = isRegExpObject.top;

  // If the global flag X6 is set and isMatchingElementOrMappedValue returns true for (topElement, _u), use getFunctionPointerHandler to create the comment
  if (X6 && isMatchingElementOrMappedValue(topElement, _u)) {
    getFunctionPointerHandler(function (documentContext) {
      // Create a comment node in the provided document context
      return documentContext.createComment(commentText);
    });
  } else {
    // If the top element is an HTMLTemplateElement, use its content as the target
    if (topElement instanceof p5.HTMLTemplateElement) {
      topElement = topElement.content;
    }
    // Append the comment node to the target element using a custom _appendChild method
    topElement._appendChild(topElement.ownerDocument.createComment(commentText));
  }
}

module.exports = appendCommentNodeToTopElement;