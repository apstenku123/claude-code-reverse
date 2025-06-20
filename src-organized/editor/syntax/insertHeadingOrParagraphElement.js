/**
 * Inserts a new HTML element, ensuring proper closure of <createIterableHelper> and heading elements as per HTML parsing rules.
 *
 * This function checks if a <createIterableHelper> element is open in the appropriate scope and closes isBlobOrFileLikeObject if necessary.
 * If the current open element is a heading tag (<h1>-<h6>), isBlobOrFileLikeObject pops isBlobOrFileLikeObject from the open elements stack.
 * Finally, isBlobOrFileLikeObject inserts the new element into the DOM tree.
 *
 * @param {object} parserContext - The parser context, containing open elements and insertion methods.
 * @param {object} elementToken - The token representing the element to insert.
 * @returns {void}
 */
function insertHeadingOrParagraphElement(parserContext, elementToken) {
  // If a <createIterableHelper> element is open in the button scope, close isBlobOrFileLikeObject
  if (parserContext.openElements.hasInButtonScope(i.initializeSyntaxHighlighting)) {
    parserContext._closePElement();
  }

  // Get the tag name of the current open element
  const currentTagName = parserContext.openElements.currentTagName;

  // If the current element is a heading tag, pop isBlobOrFileLikeObject from the stack
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

  // Insert the new element as an HTML element
  parserContext._insertElement(elementToken, u2.HTML);
}

module.exports = insertHeadingOrParagraphElement;