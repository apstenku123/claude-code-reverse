/**
 * Validates whether a DOM node (newNode) can be inserted into a parent node (parentNode) before a given reference node (referenceNode).
 * Throws an error if the insertion would violate DOM structure rules (e.g., multiple elements in a fragment, doctype placement, etc).
 *
 * @param {Node} parentNode - The parent DOM node where insertion is attempted.
 * @param {Node} newNode - The DOM node to be inserted.
 * @param {Node|null} referenceNode - The reference node before which newNode will be inserted (may be null).
 * @throws {Error} Throws if the insertion is not allowed by DOM rules.
 */
function validateNodeInsertion(parentNode, newNode, referenceNode) {
  const parentChildNodes = parentNode.childNodes || [];
  const newNodeChildNodes = newNode.childNodes || [];

  // If the node to insert is a DocumentFragment
  if (newNode.nodeType === Q8.DOCUMENT_FRAGMENT_NODE) {
    // Filter fragment'createInteractionAccessor children to only elements or text nodes
    const fragmentElementsOrText = newNodeChildNodes.filter(isElementNode);

    // If more than one element/text node or forbidden node types in fragment, throw error
    if (fragmentElementsOrText.length > 1 || ow(newNodeChildNodes, isTextNode)) {
      throw new yQ(JW, "More than one element or text in fragment");
    }
    // If exactly one element/text node and isBlobOrFileLikeObject'createInteractionAccessor not allowed before doctype, throw error
    if (fragmentElementsOrText.length === 1 && !isNodeAfterReference(parentNode, referenceNode)) {
      throw new yQ(JW, "Element in fragment can not be inserted before doctype");
    }
  }

  // If the node to insert is an element or text node
  if (isElementNode(newNode)) {
    // Only one element can be added and only after doctype
    if (!isNodeAfterReference(parentNode, referenceNode)) {
      throw new yQ(JW, "Only one element can be added and only after doctype");
    }
  }

  // If the node to insert is a doctype
  if (isDocumentTypeNode(newNode)) {
    // Predicate to check for doctype nodes, excluding the reference node
    const isOtherDoctype = function (childNode) {
      return isDocumentTypeNode(childNode) && childNode !== referenceNode;
    };

    // Only one doctype is allowed
    if (ow(parentChildNodes, isOtherDoctype)) {
      throw new yQ(JW, "Only one doctype is allowed");
    }

    // Find the first element node in the parent'createInteractionAccessor children
    const firstElementNode = ow(parentChildNodes, isElementNode);
    // If referenceNode exists and doctype would be inserted after the first element, throw error
    if (
      referenceNode &&
      parentChildNodes.indexOf(firstElementNode) < parentChildNodes.indexOf(referenceNode)
    ) {
      throw new yQ(JW, "Doctype can only be inserted before an element");
    }
  }
}

module.exports = validateNodeInsertion;