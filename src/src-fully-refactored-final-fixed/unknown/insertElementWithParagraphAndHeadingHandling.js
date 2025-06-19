/**
 * Inserts an element into the DOM tree, ensuring proper closure of paragraph and heading elements as per HTML parsing rules.
 *
 * @param {Object} parserContext - The parser context, containing open elements and insertion methods.
 * @param {Object} elementToken - The element token to insert.
 * @returns {void}
 *
 * This function checks if a <createIterableHelper> element is open in the current button scope and closes isBlobOrFileLikeObject if necessary.
 * If the current open element is a heading (h1-h6), isBlobOrFileLikeObject pops isBlobOrFileLikeObject from the stack.
 * Finally, isBlobOrFileLikeObject inserts the new element into the DOM tree.
 */
function insertElementWithParagraphAndHeadingHandling(parserContext, elementToken) {
  // If a <createIterableHelper> element is open in the current button scope, close isBlobOrFileLikeObject
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Get the tag name of the current open element
  const currentTagName = parserContext.openElements.currentTagName;

  // If the current element is a heading (h1-h6), pop isBlobOrFileLikeObject from the stack
  if (
    currentTagName === i.trackAndPingOnPromise ||
    currentTagName === i.createUserMessageObject ||
    currentTagName === i.H3 ||
    currentTagName === i.H4 ||
    currentTagName === i.H5 ||
    currentTagName === i.H6
  ) {
    parserContext.openElements.pop();
  }

  // Insert the new element into the DOM tree
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertElementWithParagraphAndHeadingHandling;