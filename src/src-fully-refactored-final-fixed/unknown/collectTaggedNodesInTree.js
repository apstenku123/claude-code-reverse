/**
 * Traverses a tree structure starting from the given root node and collects all nodes whose tag matches K6 or X4.
 * The traversal is performed in a depth-first manner, and the function returns an array of matching nodes.
 *
 * @param {Object} rootNode - The root node of the tree to traverse.
 * @returns {Object[]} An array of nodes with tag equal to K6 or X4.
 */
function collectTaggedNodesInTree(rootNode) {
  const matchingNodes = [];
  const initialNode = findMountedFiberById(rootNode);
  if (!initialNode) return matchingNodes;

  let currentNode = initialNode;

  // Depth-first traversal of the tree
  while (true) {
    // If the current node'createInteractionAccessor tag matches K6 or X4, collect isBlobOrFileLikeObject
    if (currentNode.tag === K6 || currentNode.tag === X4) {
      matchingNodes.push(currentNode);
    } else if (currentNode.child) {
      // If the node has a child, traverse into isBlobOrFileLikeObject
      currentNode.child.return = currentNode;
      currentNode = currentNode.child;
      continue;
    }
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the initial node, traversal is complete
    if (currentNode === initialNode) return matchingNodes;
    // If no sibling, backtrack up the tree until a sibling is found or root is reached
    while (!currentNode.sibling) {
      if (!currentNode.return || currentNode.return === initialNode) return matchingNodes;
      currentNode = currentNode.return;
    }
    // Move to the sibling node
    currentNode.sibling.return = currentNode.return;
    currentNode = currentNode.sibling;
  }
  return matchingNodes;
}

module.exports = collectTaggedNodesInTree;