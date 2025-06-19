/**
 * Checks if the provided node is a DocumentType node.
 *
 * @param {Node} node - The node to check.
 * @returns {boolean} True if the node is a DocumentType node, otherwise false.
 */
function isDocumentTypeNode(node) {
  // Ensure the node exists and its nodeType matches DOCUMENT_TYPE_NODE
  return node && node.nodeType === Q8.DOCUMENT_TYPE_NODE;
}

module.exports = isDocumentTypeNode;