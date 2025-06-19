/**
 * Determines if a specific node (referenceNode) comes before a particular node (targetNode) among the child nodes of a given parent node.
 * Returns false if any child node (other than referenceNode) matches the 'isElementNode' predicate, or if targetNode comes before referenceNode.
 *
 * @param {Node} parentNode - The parent DOM node whose children are to be checked.
 * @param {Node} referenceNode - The reference DOM node to compare positions against.
 * @returns {boolean} True if no conflicting nodes are found and referenceNode is not before targetNode; otherwise, false.
 */
function isNodeAfterReference(parentNode, referenceNode) {
  const childNodes = parentNode.childNodes || [];

  /**
   * Checks if the node matches the 'isElementNode' predicate and is not the referenceNode.
   * @param {Node} node
   * @returns {boolean}
   */
  function isOtherMatchingNode(node) {
    return isElementNode(node) && node !== referenceNode;
  }

  // If any child node (other than referenceNode) matches the 'isElementNode' predicate, return false
  if (ow(childNodes, isOtherMatchingNode)) {
    return false;
  }

  // Find the first child node that matches the 'isDocumentTypeNode' predicate
  const matchingNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode exists, matchingNode exists, and matchingNode comes after referenceNode, return true
  // Otherwise, return false
  return !(
    referenceNode &&
    matchingNode &&
    childNodes.indexOf(matchingNode) > childNodes.indexOf(referenceNode)
  );
}

module.exports = isNodeAfterReference;