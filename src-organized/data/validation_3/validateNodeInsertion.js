/**
 * Validates whether a DOM node can be inserted into a parent node at a given position.
 * Throws descriptive errors if the insertion violates DOM structure rules (e.g., multiple elements in a fragment, doctype placement).
 *
 * @param {Node} parentNode - The parent DOM node into which insertion is attempted.
 * @param {Node} nodeToInsert - The DOM node (or fragment) being inserted.
 * @param {Node|null} referenceNode - The node before which nodeToInsert is inserted, or null to append at the end.
 * @throws {Error} Throws if insertion would violate DOM structure constraints.
 */
function validateNodeInsertion(parentNode, nodeToInsert, referenceNode) {
  const parentChildNodes = parentNode.childNodes || [];
  const nodeToInsertChildNodes = nodeToInsert.childNodes || [];

  // If inserting a document fragment, validate its contents
  if (nodeToInsert.nodeType === Q8.DOCUMENT_FRAGMENT_NODE) {
    // Get all element or text nodes in the fragment
    const elementOrTextNodes = nodeToInsertChildNodes.filter(isElementNode);

    // If more than one element/text node, or invalid content, throw
    if (elementOrTextNodes.length > 1 || ow(nodeToInsertChildNodes, isTextNode)) {
      throw new yQ(JW, "More than one element or text in fragment");
    }

    // If fragment contains an element, ensure isBlobOrFileLikeObject'createInteractionAccessor inserted after doctype
    if (
      elementOrTextNodes.length === 1 &&
      !isNodeAfterReferenceNode(parentNode, referenceNode)
    ) {
      throw new yQ(JW, "Element in fragment can not be inserted before doctype");
    }
  }

  // If inserting a single element or text node, ensure only one can be added and only after doctype
  if (isElementNode(nodeToInsert)) {
    if (!isNodeAfterReferenceNode(parentNode, referenceNode)) {
      throw new yQ(JW, "Only one element can be added and only after doctype");
    }
  }

  // If inserting a doctype node, ensure only one doctype is present and isBlobOrFileLikeObject is in the correct position
  if (isDocumentTypeNode(nodeToInsert)) {
    // Only one doctype allowed in the parent
    if (ow(parentChildNodes, isDocumentTypeNode)) {
      throw new yQ(JW, "Only one doctype is allowed");
    }
    // Find the first element node in the parent
    const firstElementNode = ow(parentChildNodes, isElementNode);
    // If referenceNode is present, doctype must be inserted before the first element
    if (
      referenceNode &&
      parentChildNodes.indexOf(firstElementNode) < parentChildNodes.indexOf(referenceNode)
    ) {
      throw new yQ(JW, "Doctype can only be inserted before an element");
    }
    // If appending (no referenceNode) and an element is already present, doctype cannot be appended
    if (!referenceNode && firstElementNode) {
      throw new yQ(JW, "Doctype can not be appended since element is present");
    }
  }
}

module.exports = validateNodeInsertion;