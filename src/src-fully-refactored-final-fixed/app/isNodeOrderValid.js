/**
 * Determines if the order of nodes in a given node'createInteractionAccessor childNodes array is valid with respect to a reference node.
 * Returns false if the childNodes array is of a certain type or if the reference node is a DocumentType node.
 * Otherwise, checks if the DocumentType node appears after the reference node in the childNodes array.
 *
 * @param {Node} parentNode - The DOM node whose childNodes will be examined.
 * @param {Node} referenceNode - The node to compare against the DocumentType node in the childNodes array.
 * @returns {boolean} True if the node order is valid, false otherwise.
 */
function isNodeOrderValid(parentNode, referenceNode) {
  // Get the childNodes array or default to an empty array if undefined
  const childNodes = parentNode.childNodes || [];

  // If childNodes is of a certain type (isElementNode) or referenceNode is a DocumentType node, return false
  if (ow(childNodes, isElementNode) || isDocumentTypeNode(referenceNode)) {
    return false;
  }

  // Find the DocumentType node within childNodes, if any
  const documentTypeNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode and documentTypeNode are both present, check their order in childNodes
  // Return true if documentTypeNode does NOT appear after referenceNode
  // Otherwise, return false
  return !(
    referenceNode &&
    documentTypeNode &&
    childNodes.indexOf(documentTypeNode) > childNodes.indexOf(referenceNode)
  );
}

module.exports = isNodeOrderValid;