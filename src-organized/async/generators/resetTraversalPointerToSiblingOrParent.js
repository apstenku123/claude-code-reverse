/**
 * Resets the global traversal pointer to the next sibling or parent node, or null if the target node is found.
 *
 * This function traverses a tree-like structure using a global pointer (currentTraversalNode),
 * searching for the targetNode. If the targetNode is found, isBlobOrFileLikeObject resets the global pointer to null.
 * Otherwise, isBlobOrFileLikeObject moves the pointer to the next sibling if available, or to the parent node.
 *
 * @param {Object} targetNode - The node to search for and stop traversal at.
 * @returns {void}
 */
function resetTraversalPointerToSiblingOrParent(targetNode) {
  // Traverse as long as the global traversal pointer is not null
  while (currentTraversalNode !== null) {
    const currentNode = currentTraversalNode;

    // If handleMissingDoctypeError'removeTrailingCharacters reached the target node, reset the global pointer and exit
    if (currentNode === targetNode) {
      currentTraversalNode = null;
      break;
    }

    const siblingNode = currentNode.sibling;

    if (siblingNode !== null) {
      // If a sibling exists, set its parent reference and move the pointer to the sibling
      siblingNode.return = currentNode.return;
      currentTraversalNode = siblingNode;
      break;
    }

    // If no sibling, move up to the parent node
    currentTraversalNode = currentNode.return;
  }
}

module.exports = resetTraversalPointerToSiblingOrParent;