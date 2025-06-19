/**
 * Appends a child node to a parent element, handling special cases where foster parenting is required.
 * If the element causes foster parenting, isBlobOrFileLikeObject delegates to the foster parent handler. Otherwise, isBlobOrFileLikeObject appends the child,
 * handling <template> elements in the HTML namespace by appending to their content fragment.
 *
 * @param {Object} domHandler - The DOM handler object providing tree adapter and foster parenting logic.
 * @param {Object} parentElement - The parent element to which the child node will be appended.
 * @param {Object} childNode - The node to append as a child.
 * @returns {void}
 */
function appendOrFosterParentElement(domHandler, parentElement, childNode) {
  // Check if the parent element requires foster parenting for the child node
  if (domHandler._isElementCausesFosterParenting(parentElement)) {
    // Delegate to foster parent handler
    domHandler._fosterParentElement(childNode);
  } else {
    // Retrieve tag name and namespace of the parent element
    const tagName = domHandler.treeAdapter.getTagName(parentElement);
    const namespaceURI = domHandler.treeAdapter.getNamespaceURI(parentElement);

    // If the parent is a <template> element in the HTML namespace, append to its content fragment
    if (tagName === i.TEMPLATE && namespaceURI === u2.HTML) {
      parentElement = domHandler.treeAdapter.getTemplateContent(parentElement);
    }
    // Append the child node to the (possibly updated) parent element
    domHandler.treeAdapter.appendChild(parentElement, childNode);
  }
}

module.exports = appendOrFosterParentElement;