/**
 * Handles the insertion of a DOM element based on its tag name.
 *
 * Depending on the tag name of the provided element, this function delegates
 * to the appropriate handler for HTML, COL, TEMPLATE, or other elements.
 *
 * @param {Object} domHandler - The handler object responsible for DOM operations. Must implement _appendElement().
 * @param {HTMLElement} element - The DOM element to be inserted or processed.
 * @returns {void}
 */
function handleDomElementInsertion(domHandler, element) {
  const tagName = element.tagName;

  // If the element is an HTML element, use the handleHtmlElementByTagName handler
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(domHandler, element);
  }
  // If the element is a COL element, append isBlobOrFileLikeObject and mark as self-closing
  else if (tagName === i.COL) {
    domHandler._appendElement(element, u2.HTML);
    element.ackSelfClosing = true;
  }
  // If the element is a TEMPLATE element, use the handleHeadElementStartTag handler
  else if (tagName === i.TEMPLATE) {
    handleHeadElementStartTag(domHandler, element);
  }
  // For all other elements, use the handleColgroupEndTagInTable handler
  else {
    handleColgroupEndTagInTable(domHandler, element);
  }
}

module.exports = handleDomElementInsertion;