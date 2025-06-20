/**
 * Handles the insertion of an HTML element into a document or component tree.
 * Dispatches to the appropriate handler based on the element'createInteractionAccessor tag name.
 *
 * @param {Object} context - The context or parent object responsible for handling the insertion (e.g., a DOM manager).
 * @param {HTMLElement} element - The HTML element to be inserted.
 */
function handleHtmlElementInsertion(context, element) {
  // Get the tag name of the element (e.g., 'HTML', 'COL', 'TEMPLATE', etc.)
  const tagName = element.tagName;

  // Check the tag name and call the appropriate handler
  if (tagName === i.HTML) {
    // Handle insertion for the root HTML element
    handleHtmlElementByTagName(context, element);
  } else if (tagName === i.COL) {
    // Handle insertion for <col> elements, which are self-closing
    context._appendElement(element, u2.HTML);
    element.ackSelfClosing = true; // Mark as self-closing
  } else if (tagName === i.TEMPLATE) {
    // Handle insertion for <template> elements
    handleHeadElementStartTag(context, element);
  } else {
    // Handle insertion for all other element types
    handleColgroupEndTagInTable(context, element);
  }
}

module.exports = handleHtmlElementInsertion;