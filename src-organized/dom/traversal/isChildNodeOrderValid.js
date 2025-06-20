/**
 * Determines if the order of child nodes in a parent element is valid with respect to a reference node.
 *
 * Checks if all child nodes (except a given reference node) pass a provided predicate (isElementNode),
 * and then compares the positions of a specific child node (found by isDocumentTypeNode) and the reference node.
 *
 * @param {Node} parentNode - The parent DOM node whose child nodes are to be checked.
 * @param {Node} referenceNode - The reference DOM node to compare order against.
 * @returns {boolean} Returns true if the order is valid, false otherwise.
 */
function isChildNodeOrderValid(parentNode, referenceNode) {
  // Get the child nodes of the parent node, or an empty array if none
  const childNodes = parentNode.childNodes || [];

  /**
   * Predicate to check if a node is valid and not the reference node.
   * @param {Node} node
   * @returns {boolean}
   */
  function isValidNode(node) {
    return isElementNode(node) && node !== referenceNode;
  }

  // If any child node (except the reference node) fails the predicate, return false
  if (ow(childNodes, isValidNode)) {
    return false;
  }

  // Find the first child node that satisfies the isDocumentTypeNode predicate
  const matchedNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode, matchedNode exist and matchedNode comes after referenceNode, return false
  if (
    referenceNode &&
    matchedNode &&
    childNodes.indexOf(matchedNode) > childNodes.indexOf(referenceNode)
  ) {
    return false;
  }

  // Otherwise, the order is valid
  return true;
}

module.exports = isChildNodeOrderValid;