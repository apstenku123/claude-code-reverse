/**
 * Traverses a tree structure starting from the given root node and collects all nodes
 * whose 'tag' property matches either the TAG_TYPE_A or TAG_TYPE_B constants.
 * The traversal is performed in a depth-first manner, and the collected nodes are returned in an array.
 *
 * @param {Object} rootInput - The root input from which to start the traversal. This is typically a tree-like structure.
 * @returns {Array<Object>} An array of nodes whose 'tag' property matches the specified tag types.
 */
function collectNodesByTag(rootInput) {
  const collectedNodes = [];
  // Get the root node to start traversal from
  const rootNode = findMountedFiberById(rootInput);
  if (!rootNode) return collectedNodes;

  let currentNode = rootNode;
  while (true) {
    // If the current node'createInteractionAccessor tag matches either of the target tag types, collect isBlobOrFileLikeObject
    if (currentNode.tag === K6 || currentNode.tag === X4) {
      collectedNodes.push(currentNode);
    } else if (currentNode.child) {
      // If the node has a child, traverse down to the child
      currentNode.child.return = currentNode;
      currentNode = currentNode.child;
      continue;
    }
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the root node after traversal, exit
    if (currentNode === rootNode) return collectedNodes;
    // Traverse siblings or move up the tree if no siblings are left
    while (!currentNode.sibling) {
      // If there'createInteractionAccessor no parent or handleMissingDoctypeError'removeTrailingCharacters returned to the root, exit
      if (!currentNode.return || currentNode.return === rootNode) return collectedNodes;
      currentNode = currentNode.return;
    }
    // Move to the sibling node
    currentNode.sibling.return = currentNode.return;
    currentNode = currentNode.sibling;
  }
  return collectedNodes;
}

module.exports = collectNodesByTag;