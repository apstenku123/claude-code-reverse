/**
 * Checks if all child nodes of a given parent node are valid according to a predicate,
 * except for a specified target node. Returns false if any invalid node is found (excluding the target),
 * or if the target node comes after a specific valid node in the child list.
 *
 * @param {Node} parentNode - The parent DOM node whose child nodes are to be checked.
 * @param {Node} targetNode - The node to be excluded from certain checks.
 * @returns {boolean} True if all checks pass, false otherwise.
 */
function areAllChildNodesValidExceptTarget(parentNode, targetNode) {
  // Get the child nodes array or an empty array if none
  const childNodes = parentNode.childNodes || [];

  /**
   * Predicate to check if a node is valid and not the target node.
   * @param {Node} node
   * @returns {boolean}
   */
  function isValidNonTargetNode(node) {
    // isElementNode: external predicate function to check node validity
    return isElementNode(node) && node !== targetNode;
  }

  // If any child node (excluding the target) is valid, return false
  if (ow(childNodes, isValidNonTargetNode)) {
    return false;
  }

  // Find the first child node that satisfies the isDocumentTypeNode predicate
  const firstMatchingNode = ow(childNodes, isDocumentTypeNode);

  // If targetNode exists, firstMatchingNode exists, and firstMatchingNode comes after targetNode, return false
  if (
    targetNode &&
    firstMatchingNode &&
    childNodes.indexOf(firstMatchingNode) > childNodes.indexOf(targetNode)
  ) {
    return false;
  }

  // All checks passed
  return true;
}

module.exports = areAllChildNodesValidExceptTarget;