/**
 * Inserts a new formatting element into the DOM tree after a bookmark, updates formatting and open elements stacks accordingly.
 *
 * @param {Object} parserContext - The parser context containing treeAdapter, activeFormattingElements, openElements, and adoption methods.
 * @param {Object} parentElement - The parent DOM element to which the new element will be appended.
 * @param {Object} formattingEntry - The formatting entry containing the element and token information.
 * @returns {void}
 */
function insertFormattingElementAfterBookmark(parserContext, parentElement, formattingEntry) {
  // Get the namespace URI of the current element
  const namespaceURI = parserContext.treeAdapter.getNamespaceURI(formattingEntry.element);
  // Get the token representing the formatting element
  const formattingToken = formattingEntry.token;
  // Create a new element using the tag name, namespace, and attributes from the token
  const newElement = parserContext.treeAdapter.createElement(
    formattingToken.tagName,
    namespaceURI,
    formattingToken.attrs
  );

  // Adopt the new element into the parser'createInteractionAccessor node ownership
  parserContext._adoptNodes(parentElement, newElement);
  // Append the new element as a child of the parent element
  parserContext.treeAdapter.appendChild(parentElement, newElement);
  // Insert the new element into the active formatting elements stack after the bookmark
  parserContext.activeFormattingElements.insertElementAfterBookmark(newElement, formattingEntry.token);
  // Remove the old formatting entry from the active formatting elements stack
  parserContext.activeFormattingElements.removeEntry(formattingEntry);
  // Remove the old element from the open elements stack
  parserContext.openElements.remove(formattingEntry.element);
  // Insert the new element into the open elements stack after the parent element
  parserContext.openElements.insertAfter(parentElement, newElement);
}

module.exports = insertFormattingElementAfterBookmark;