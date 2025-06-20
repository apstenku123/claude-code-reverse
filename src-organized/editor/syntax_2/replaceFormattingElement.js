/**
 * Replaces a formatting element in the DOM tree with a new element based on the provided token.
 * This is typically used in HTML parsing algorithms to handle active formatting elements.
 *
 * @param {object} parserContext - The parser context containing treeAdapter and element manipulation methods.
 * @param {object} parentElement - The parent DOM element under which the replacement occurs.
 * @param {object} formattingEntry - The formatting entry containing the element to replace and the token to use.
 * @returns {void}
 */
function replaceFormattingElement(parserContext, parentElement, formattingEntry) {
  // Get the namespace URI of the element to be replaced
  const namespaceURI = parserContext.treeAdapter.getNamespaceURI(formattingEntry.element);
  // Get the token representing the new element
  const token = formattingEntry.token;
  // Create a new element using the tag name, namespace, and attributes from the token
  const newElement = parserContext.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);

  // Adopt all child nodes from the old element to the new element
  parserContext._adoptNodes(parentElement, newElement);
  // Append the new element as a child of the parent element
  parserContext.treeAdapter.appendChild(parentElement, newElement);
  // Insert the new element into the active formatting elements list after the bookmark
  parserContext.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  // Remove the old formatting entry from the active formatting elements list
  parserContext.activeFormattingElements.removeEntry(formattingEntry);
  // Remove the old element from the open elements stack
  parserContext.openElements.remove(formattingEntry.element);
  // Insert the new element into the open elements stack after the parent element
  parserContext.openElements.insertAfter(parentElement, newElement);
}

module.exports = replaceFormattingElement;