/**
 * Determines if there is any valid node before a given reference node in a node list.
 *
 * @param {Node} parentNode - The parent DOM node whose child nodes are to be checked.
 * @param {Node} referenceNode - The reference DOM node to compare positions against.
 * @returns {boolean} Returns true if there is no valid node before the reference node, otherwise false.
 */
function isNodeBeforeReferenceNode(parentNode, referenceNode) {
  // Get the child nodes of the parent node, or an empty array if none
  const childNodes = parentNode.childNodes || [];

  /**
   * Checks if a node is valid and not the reference node.
   * @param {Node} node - The node to check.
   * @returns {boolean}
   */
  function isValidNode(node) {
    return isElementNode(node) && node !== referenceNode;
  }

  // If any child node is valid and not the reference node, return false
  if (ow(childNodes, isValidNode)) {
    return false;
  }

  // Find the first child node that matches the isDocumentTypeNode predicate
  const matchingNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode exists, matchingNode exists, and matchingNode comes after referenceNode, return false
  if (referenceNode && matchingNode && childNodes.indexOf(matchingNode) > childNodes.indexOf(referenceNode)) {
    return false;
  }

  // Otherwise, return true
  return true;
}

module.exports = isNodeBeforeReferenceNode;