/**
 * Checks if the provided node is a Document, DocumentFragment, or Element node.
 *
 * @param {Node|null|undefined} node - The node to check.
 * @returns {boolean} True if the node is a Document, DocumentFragment, or Element node; otherwise, false.
 */
function isDocumentOrElementNode(node) {
  // Ensure node is not null or undefined, then check its nodeType
  return (
    !!node && (
      node.nodeType === Q8.DOCUMENT_NODE ||
      node.nodeType === Q8.DOCUMENT_FRAGMENT_NODE ||
      node.nodeType === Q8.ELEMENT_NODE
    )
  );
}

module.exports = isDocumentOrElementNode;