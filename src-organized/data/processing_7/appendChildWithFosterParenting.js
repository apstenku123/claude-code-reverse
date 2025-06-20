/**
 * Appends a child node to a parent node, handling foster parenting if required.
 *
 * If the child node causes foster parenting (e.g., certain elements in HTML parsing),
 * the foster parenting logic is invoked. Otherwise, the child is appended directly,
 * with special handling for <template> elements in the HTML namespace.
 *
 * @param {object} parserContext - The parser context or handler, providing treeAdapter and foster parenting logic.
 * @param {object} parentNode - The node to which the child will be appended.
 * @param {object} childNode - The node to append as a child.
 * @returns {void}
 */
function appendChildWithFosterParenting(parserContext, parentNode, childNode) {
  // Check if foster parenting is required for this element
  if (parserContext._isElementCausesFosterParenting(parentNode)) {
    // Handle foster parenting logic
    parserContext._fosterParentElement(childNode);
  } else {
    // Get the tag name and namespace of the parent node
    const tagName = parserContext.treeAdapter.getTagName(parentNode);
    const namespaceURI = parserContext.treeAdapter.getNamespaceURI(parentNode);

    // If the parent is a <template> element in the HTML namespace,
    // append to its template content instead
    if (tagName === i.TEMPLATE && namespaceURI === u2.HTML) {
      parentNode = parserContext.treeAdapter.getTemplateContent(parentNode);
    }
    // Append the child node to the (possibly updated) parent node
    parserContext.treeAdapter.appendChild(parentNode, childNode);
  }
}

module.exports = appendChildWithFosterParenting;