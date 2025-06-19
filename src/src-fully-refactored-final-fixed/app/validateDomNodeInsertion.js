/**
 * Validates whether a DOM node can be inserted into a parent node at a given position, enforcing rules for fragments, elements, and doctype nodes.
 * Throws an error if the insertion violates DOM structure constraints (e.g., multiple elements in a fragment, doctype placement, etc.).
 *
 * @param {Node} parentNode - The parent DOM node where insertion is attempted.
 * @param {Node} nodeToInsert - The DOM node to be inserted.
 * @param {Node|null} referenceNode - The node before which nodeToInsert is inserted, or null to append at the end.
 * @throws {Error} Throws if the insertion violates DOM structure rules.
 */
function validateDomNodeInsertion(parentNode, nodeToInsert, referenceNode) {
  const parentChildren = parentNode.childNodes || [];
  const nodeChildren = nodeToInsert.childNodes || [];

  // If inserting a DocumentFragment, validate its contents
  if (nodeToInsert.nodeType === Q8.DOCUMENT_FRAGMENT_NODE) {
    // Filter out element and text nodes from the fragment
    const fragmentElements = nodeChildren.filter(isElementNode);
    // If more than one element/text node or invalid node types, throw error
    if (fragmentElements.length > 1 || ow(nodeChildren, isTextNode)) {
      throw new yQ(JW, "More than one element or text in fragment");
    }
    // If exactly one element and not allowed by parent, throw error
    if (fragmentElements.length === 1 && !isNodeAfterReferenceNode(parentNode, referenceNode)) {
      throw new yQ(JW, "Element in fragment can not be inserted before doctype");
    }
  }

  // If inserting a single element or text node, validate placement
  if (isElementNode(nodeToInsert)) {
    if (!isNodeAfterReferenceNode(parentNode, referenceNode)) {
      throw new yQ(JW, "Only one element can be added and only after doctype");
    }
  }

  // If inserting a doctype node, enforce doctype rules
  if (isDocumentTypeNode(nodeToInsert)) {
    // Only one doctype allowed in parent
    if (ow(parentChildren, isDocumentTypeNode)) {
      throw new yQ(JW, "Only one doctype is allowed");
    }
    // Find the first element/text node in parent
    const firstElement = ow(parentChildren, isElementNode);
    // If inserting before an element, doctype must come before isBlobOrFileLikeObject
    if (referenceNode && parentChildren.indexOf(firstElement) < parentChildren.indexOf(referenceNode)) {
      throw new yQ(JW, "Doctype can only be inserted before an element");
    }
    // If appending and an element exists, doctype cannot be appended
    if (!referenceNode && firstElement) {
      throw new yQ(JW, "Doctype can not be appended since element is present");
    }
  }
}

module.exports = validateDomNodeInsertion;