/**
 * Handles special HTML elements by delegating to the appropriate handler based on the tag name.
 *
 * @param {object} domHandler - The DOM handler object that provides methods to manipulate the DOM.
 * @param {HTMLElement} element - The HTML element to be processed.
 * @returns {void}
 */
function handleSpecialHtmlElements(domHandler, element) {
  const tagName = element.tagName;

  // If the element is an <html> tag, use the handleHtmlElementByTagName handler
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(domHandler, element);
  }
  // If the element is a <frameset> tag, insert isBlobOrFileLikeObject using the HTML context
  else if (tagName === i.FRAMESET) {
    domHandler._insertElement(element, u2.HTML);
  }
  // If the element is a <frame> tag, append isBlobOrFileLikeObject and mark as self-closing
  else if (tagName === i.FRAME) {
    domHandler._appendElement(element, u2.HTML);
    element.ackSelfClosing = true;
  }
  // If the element is a <noframes> tag, use the handleHeadElementStartTag handler
  else if (tagName === i.NOFRAMES) {
    handleHeadElementStartTag(domHandler, element);
  }
}

module.exports = handleSpecialHtmlElements;