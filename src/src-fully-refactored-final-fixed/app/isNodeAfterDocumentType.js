/**
 * Determines if a given DOM node (targetNode) comes after the DocumentType node among the childNodes of a parent node.
 * Returns false if the childNodes array is not an array of nodes or if the targetNode is itself a DocumentType node.
 *
 * @param {Node} parentNode - The DOM node whose childNodes will be inspected.
 * @param {Node} targetNode - The DOM node to check the position of relative to the DocumentType node.
 * @returns {boolean} True if targetNode comes after the DocumentType node in parentNode.childNodes; otherwise, false.
 */
function isNodeAfterDocumentType(parentNode, targetNode) {
  // Get the childNodes array from the parent node, or an empty array if not present
  const childNodes = parentNode.childNodes || [];

  // If childNodes is not a valid array of nodes, or targetNode is a DocumentType node, return false
  if (ow(childNodes, isElementNode) || isDocumentTypeNode(targetNode)) {
    return false;
  }

  // Find the DocumentType node among the childNodes
  const documentTypeNode = ow(childNodes, isDocumentTypeNode);

  // If targetNode, documentTypeNode, and both exist in childNodes,
  // check if targetNode comes after documentTypeNode
  return !(
    targetNode &&
    documentTypeNode &&
    childNodes.indexOf(documentTypeNode) > childNodes.indexOf(targetNode)
  );
}

module.exports = isNodeAfterDocumentType;