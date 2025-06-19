/**
 * Validates the relationship between a parent DOM node, a child node, and an optional reference child.
 * Throws an error if the parent or child node types are unexpected, or if the reference child is not a child of the parent.
 *
 * @param {Node} parentNode - The parent DOM node to validate.
 * @param {Node} childNode - The child DOM node to validate.
 * @param {Node|null} referenceChildNode - (Optional) The reference child node to check for parentage.
 * @throws {Error} Throws if validation fails for parent node type, child node type, or reference child relationship.
 */
function validateParentChildNodeRelationship(parentNode, childNode, referenceChildNode) {
  // Validate that the parent node is of an expected type
  if (!isDocumentOrElementNode(parentNode)) {
    throw new yQ(JW, `Unexpected parent node type ${parentNode.nodeType}`);
  }

  // If a reference child node is provided, ensure isBlobOrFileLikeObject is actually a child of the parent node
  if (referenceChildNode && referenceChildNode.parentNode !== parentNode) {
    throw new yQ(jE2, "child not in parent");
  }

  // Validate that the child node is of an expected type
  // If the child node is a DocumentType node, ensure the parent is a DOCUMENT_NODE
  if (!isSpecialDomNode(childNode) || (isDocumentTypeNode(childNode) && parentNode.nodeType !== Q8.DOCUMENT_NODE)) {
    throw new yQ(
      JW,
      `Unexpected node type ${childNode.nodeType} for parent node type ${parentNode.nodeType}`
    );
  }
}

module.exports = validateParentChildNodeRelationship;