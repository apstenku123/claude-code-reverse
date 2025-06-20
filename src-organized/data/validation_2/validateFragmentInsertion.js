/**
 * Validates the insertion of a DOM fragment or node into a target parent node.
 * Ensures that only valid combinations of elements, text nodes, and doctypes are inserted,
 * and throws descriptive errors if constraints are violated (e.g., more than one element in a fragment,
 * doctype placement rules, etc.).
 *
 * @param {Node} targetParentNode - The parent DOM node where insertion is attempted.
 * @param {Node} nodeToInsert - The DOM node or fragment to be inserted.
 * @param {Node} referenceNode - The reference node before which the insertion is attempted.
 * @throws {yQ} Throws error if insertion rules are violated.
 */
function validateFragmentInsertion(targetParentNode, nodeToInsert, referenceNode) {
  const parentChildNodes = targetParentNode.childNodes || [];
  const insertChildNodes = nodeToInsert.childNodes || [];

  // If inserting a document fragment, validate its contents
  if (nodeToInsert.nodeType === Q8.DOCUMENT_FRAGMENT_NODE) {
    // Filter out element and text nodes from the fragment
    const fragmentElements = insertChildNodes.filter(isElementNode);
    // If more than one element/text node or invalid content, throw error
    if (fragmentElements.length > 1 || ow(insertChildNodes, isTextNode)) {
      throw new yQ(JW, "More than one element or text in fragment");
    }
    // If exactly one element, ensure isBlobOrFileLikeObject'createInteractionAccessor not inserted before doctype
    if (fragmentElements.length === 1 && !isNodeAfterReference(targetParentNode, referenceNode)) {
      throw new yQ(JW, "Element in fragment can not be inserted before doctype");
    }
  }

  // If inserting a single element or text node, validate placement
  if (isElementNode(nodeToInsert)) {
    if (!isNodeAfterReference(targetParentNode, referenceNode)) {
      throw new yQ(JW, "Only one element can be added and only after doctype");
    }
  }

  // If inserting a doctype node, enforce doctype rules
  if (isDocumentTypeNode(nodeToInsert)) {
    // Predicate to check for doctype nodes that are not the reference node
    const isOtherDoctype = function (childNode) {
      return isDocumentTypeNode(childNode) && childNode !== referenceNode;
    };
    // Only one doctype allowed in the parent
    if (ow(parentChildNodes, isOtherDoctype)) {
      throw new yQ(JW, "Only one doctype is allowed");
    }
    // Find the first element node in the parent
    const firstElementNode = ow(parentChildNodes, isElementNode);
    // Doctype can only be inserted before the first element node
    if (referenceNode && parentChildNodes.indexOf(firstElementNode) < parentChildNodes.indexOf(referenceNode)) {
      throw new yQ(JW, "Doctype can only be inserted before an element");
    }
  }
}

module.exports = validateFragmentInsertion;