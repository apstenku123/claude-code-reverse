/**
 * Handles DOM elements based on their tag name, delegating to the appropriate handler for HTML or NOFRAMES tags.
 *
 * @param {object} context - The context or state object to be passed to the handler functions.
 * @param {HTMLElement} element - The DOM element whose tagName will be checked and handled accordingly.
 * @returns {void}
 */
function handleHtmlOrNoFramesElement(context, element) {
  // Extract the tag name from the element
  const tagName = element.tagName;

  // If the tag is HTML, delegate to the HTML handler
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(context, element);
  // If the tag is NOFRAMES, delegate to the NOFRAMES handler
  } else if (tagName === i.NOFRAMES) {
    handleHeadElementStartTag(context, element);
  }
}

module.exports = handleHtmlOrNoFramesElement;