/**
 * Determines if the provided node is a special DOM node of interest.
 * Checks if the node is a recognized wrapper, a custom node type, a DocumentType node,
 * or a node of type DOCUMENT_FRAGMENT_NODE, COMMENT_NODE, or PROCESSING_INSTRUCTION_NODE.
 *
 * @param {any} node - The DOM node or object to check.
 * @returns {boolean} True if the node matches any of the special types; otherwise, false.
 */
function isSpecialDomNode(node) {
  // Ensure the node is not null or undefined before proceeding
  if (!node) {
    return false;
  }

  // Check if node is a recognized wrapper type
  if (isElementNode(node)) {
    return true;
  }

  // Check if node matches a custom node type
  if (isTextNode(node)) {
    return true;
  }

  // Check if node is a DocumentType node
  if (isDocumentTypeNode(node)) {
    return true;
  }

  // Check for specific nodeType constants
  if (
    node.nodeType === Q8.DOCUMENT_FRAGMENT_NODE ||
    node.nodeType === Q8.COMMENT_NODE ||
    node.nodeType === Q8.PROCESSING_INSTRUCTION_NODE
  ) {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isSpecialDomNode;