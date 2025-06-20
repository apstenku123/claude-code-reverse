/**
 * Determines if a given reference node appears before a specific DocumentType node within the childNodes of a parent node.
 * Returns false if the childNodes array is not an array or is a DocumentType node, or if the reference node is not after the DocumentType node.
 *
 * @param {Node} parentNode - The DOM node whose childNodes will be inspected.
 * @param {Node} referenceNode - The node to compare position against the DocumentType node.
 * @returns {boolean} True if the referenceNode appears after the DocumentType node in parentNode.childNodes; otherwise, false.
 */
function isNodeAfterReferenceNode(parentNode, referenceNode) {
  // Get the childNodes array or default to empty array if undefined
  const childNodes = parentNode.childNodes || [];

  // If childNodes is not an array (ow checks array-ness) or is a DocumentType node, return false
  if (ow(childNodes, isElementNode) || isDocumentTypeNode(referenceNode)) {
    return false;
  }

  // Find the first DocumentType node among childNodes (ow finds first matching, isDocumentTypeNode checks type)
  const documentTypeNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode and documentTypeNode exist, check their order in childNodes
  // Return true only if referenceNode appears after documentTypeNode
  return !(
    referenceNode &&
    documentTypeNode &&
    childNodes.indexOf(documentTypeNode) > childNodes.indexOf(referenceNode)
  );
}

module.exports = isNodeAfterReferenceNode;