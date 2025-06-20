/**
 * Handles appending an element to a parent based on the element'createInteractionAccessor tag name.
 *
 * Depending on the tag name of the provided element, this function delegates to the appropriate handler:
 * - For 'HTML', calls handleHtmlElement.
 * - For 'COL', appends the element and marks isBlobOrFileLikeObject as self-closing.
 * - For 'TEMPLATE', calls handleTemplateElement.
 * - For all others, calls handleGenericElement.
 *
 * @param {Object} parentContext - The context or parent object to which the element will be appended.
 * @param {Object} element - The element object to be appended. Must have a 'tagName' property.
 * @returns {void}
 */
function handleElementAppend(parentContext, element) {
  const tagName = element.tagName;

  // Check the tag name and delegate to the appropriate handler
  if (tagName === i.HTML) {
    // Handle HTML root element
    handleHtmlElementByTagName(parentContext, element);
  } else if (tagName === i.COL) {
    // Handle COL element: append and mark as self-closing
    parentContext._appendElement(element, u2.HTML);
    element.ackSelfClosing = true;
  } else if (tagName === i.TEMPLATE) {
    // Handle TEMPLATE element
    handleHeadElementStartTag(parentContext, element);
  } else {
    // Handle all other element types
    handleColgroupEndTagInTable(parentContext, element);
  }
}

module.exports = handleElementAppend;