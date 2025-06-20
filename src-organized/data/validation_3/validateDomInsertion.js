/**
 * Validates whether a DOM node (newChildNode) can be inserted into a parent node (parentNode) at a given reference node (referenceNode).
 * Throws an error if the insertion would violate DOM structure rules (e.g., multiple root elements, doctype placement, etc).
 *
 * @param {Node} parentNode - The parent DOM node into which the new node is to be inserted.
 * @param {Node} newChildNode - The DOM node that is to be inserted.
 * @param {Node|null} referenceNode - The node before which newChildNode is to be inserted, or null to append at the end.
 * @throws {Error} Throws if the insertion is invalid according to DOM rules.
 */
function validateDomInsertion(parentNode, newChildNode, referenceNode) {
  // Get child nodes of parent and new node, defaulting to empty arrays if undefined
  const parentChildNodes = parentNode.childNodes || [];
  const newChildChildNodes = newChildNode.childNodes || [];

  // If the new child is a DocumentFragment
  if (newChildNode.nodeType === Q8.DOCUMENT_FRAGMENT_NODE) {
    // Filter out only element or text nodes from the fragment
    const fragmentElementsOrText = newChildChildNodes.filter(isElementNode);

    // If there are multiple elements/text or forbidden node types, throw
    if (fragmentElementsOrText.length > 1 || ow(newChildChildNodes, isTextNode)) {
      throw new yQ(JW, "More than one element or text in fragment");
    }

    // If there'createInteractionAccessor one element/text and isBlobOrFileLikeObject'createInteractionAccessor not allowed before doctype, throw
    if (
      fragmentElementsOrText.length === 1 &&
      !isNodeAfterReferenceNode(parentNode, referenceNode)
    ) {
      throw new yQ(JW, "Element in fragment can not be inserted before doctype");
    }
  }

  // If the new child is an element or text node
  if (isElementNode(newChildNode)) {
    // Only one element can be added and only after doctype
    if (!isNodeAfterReferenceNode(parentNode, referenceNode)) {
      throw new yQ(JW, "Only one element can be added and only after doctype");
    }
  }

  // If the new child is a doctype node
  if (isDocumentTypeNode(newChildNode)) {
    // Only one doctype is allowed
    if (ow(parentChildNodes, isDocumentTypeNode)) {
      throw new yQ(JW, "Only one doctype is allowed");
    }
    // Find the first element/text node among the parent'createInteractionAccessor children
    const firstElementOrText = ow(parentChildNodes, isElementNode);
    // If inserting before an element, doctype must come before element
    if (
      referenceNode &&
      parentChildNodes.indexOf(firstElementOrText) < parentChildNodes.indexOf(referenceNode)
    ) {
      throw new yQ(JW, "Doctype can only be inserted before an element");
    }
    // If appending and element is present, doctype cannot be appended
    if (!referenceNode && firstElementOrText) {
      throw new yQ(JW, "Doctype can not be appended since element is present");
    }
  }
}

module.exports = validateDomInsertion;