/**
 * Replaces an existing element in the open elements stack with a newly created element using the provided token and attributes.
 *
 * @param {Object} parserContext - The parser context containing the treeAdapter and openElements stack.
 * @param {Object} elementReplacementInfo - Information about the element to replace and the token for the new element.
 * @param {Object} elementReplacementInfo.element - The existing element to be replaced.
 * @param {Object} elementReplacementInfo.token - The token containing tagName and attributes for the new element.
 * @returns {Object} The newly created element that replaced the old one.
 */
function replaceElementWithNewElement(parserContext, elementReplacementInfo) {
  // Get the namespace URI of the element to be replaced
  const namespaceURI = parserContext.treeAdapter.getNamespaceURI(elementReplacementInfo.element);
  // Create a new element using the tag name, namespace, and attributes from the token
  const newElement = parserContext.treeAdapter.createElement(
    elementReplacementInfo.token.tagName,
    namespaceURI,
    elementReplacementInfo.token.attrs
  );
  // Replace the old element in the openElements stack with the new element
  parserContext.openElements.replace(elementReplacementInfo.element, newElement);
  // Update the reference to the element in the replacement info object
  elementReplacementInfo.element = newElement;
  // Return the new element
  return newElement;
}

module.exports = replaceElementWithNewElement;