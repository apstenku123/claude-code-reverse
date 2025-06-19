/**
 * Validates the relationship between a parent DOM node, a child node, and an optional reference child node.
 * Throws an error if the parent or child node types are unexpected, or if the reference child is not actually a child of the parent.
 *
 * @param {Node} parentNode - The parent DOM node to validate.
 * @param {Node} childNode - The child DOM node to validate.
 * @param {Node|null} referenceChildNode - (Optional) The reference child node to check for parentage.
 * @throws {yQ} Throws if validation fails for node types or parent-child relationship.
 */
function validateParentChildRelationship(parentNode, childNode, referenceChildNode) {
  // Ensure the parent node is of an expected type
  if (!isDocumentOrElementNode(parentNode)) {
    throw new yQ(JW, `Unexpected parent node type ${parentNode.nodeType}`);
  }

  // If a reference child node is provided, ensure isBlobOrFileLikeObject is actually a child of the parent
  if (referenceChildNode && referenceChildNode.parentNode !== parentNode) {
    throw new yQ(jE2, 'child not in parent');
  }

  // Ensure the child node is of an expected type
  // If the child is a DocumentType node, the parent must be a DOCUMENT_NODE
  if (!isSpecialDomNode(childNode) || (isDocumentTypeNode(childNode) && parentNode.nodeType !== Q8.DOCUMENT_NODE)) {
    throw new yQ(
      JW,
      `Unexpected node type ${childNode.nodeType} for parent node type ${parentNode.nodeType}`
    );
  }
}

module.exports = validateParentChildRelationship;