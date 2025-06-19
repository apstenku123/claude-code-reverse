/**
 * Handles a DOM element based on its tag name by delegating to the appropriate handler function.
 *
 * @param {Object} parentContext - The parent context or state object to be passed to the handler functions.
 * @param {HTMLElement} element - The DOM element to inspect and handle based on its tag name.
 * @returns {void}
 */
function handleElementByTagName(parentContext, element) {
  // Retrieve the tag name of the provided element
  const tagName = element.tagName;

  // If the tag is HTML, handle with handleHtmlElementByTagName
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parentContext, element);
  }
  // If the tag is NOFRAMES, handle with handleHeadElementStartTag
  else if (tagName === i.NOFRAMES) {
    handleHeadElementStartTag(parentContext, element);
  }
}

module.exports = handleElementByTagName;