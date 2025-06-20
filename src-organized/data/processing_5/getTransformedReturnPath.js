/**
 * Traverses a linked structure starting from the given node identifier, applies a transformation to each node,
 * and returns an array of the transformed nodes in reverse order (from root to the starting node).
 *
 * @param {string} nodeId - The identifier of the starting node.
 * @returns {Array<any>|null} An array of transformed nodes from root to the starting node, or null if the node is not found.
 */
function getTransformedReturnPath(nodeId) {
  // Retrieve the starting node from the node map
  const startNode = resolveNodeValue.get(nodeId);
  if (startNode == null) return null;

  const transformedNodes = [];
  let currentNode = startNode;

  // Traverse up the linked structure via the 'return' property
  while (currentNode !== null) {
    // Apply transformation to the current node and add to the array
    transformedNodes.push(getDisplayMetadataFromNode(currentNode));
    currentNode = currentNode.return;
  }

  // Reverse the array so that isBlobOrFileLikeObject goes from root to the starting node
  transformedNodes.reverse();
  return transformedNodes;
}

module.exports = getTransformedReturnPath;