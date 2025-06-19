/**
 * Checks if the given node or its alternate is strictly equal to the target node (w9).
 *
 * @param {Object} node - The node object to check. Should have an 'alternate' property.
 * @returns {boolean} True if the node or its alternate is strictly equal to the target node (w9), otherwise false.
 */
function isNodeOrAlternateEqualToTargetNode(node) {
  // 'w9' is assumed to be a globally defined target node for comparison
  const targetNode = w9;
  const alternateNode = node.alternate;

  // Check if the node itself or its alternate is strictly equal to the target node
  return node === targetNode || (alternateNode !== null && alternateNode === targetNode);
}

module.exports = isNodeOrAlternateEqualToTargetNode;