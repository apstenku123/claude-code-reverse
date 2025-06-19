/**
 * Traverses up a tree of nodes starting from the given node, searching for the root node with a specific tag (J4).
 * If the starting node does not have an 'alternate' property, the function may skip nodes with certain flags set (flags 2 or 4096),
 * returning the last such node encountered. Otherwise, isBlobOrFileLikeObject simply traverses up to the root.
 *
 * @param {Object} startNode - The node from which to start traversing up the tree. Must have 'return', 'alternate', 'flags', and 'tag' properties.
 * @returns {Object|null} - Returns the last node encountered with the specified tag (J4), or null if not found.
 */
function findRootWithSpecificTag(startNode) {
  let currentNode = startNode;
  let lastMatchingNode = startNode;

  // If the node does not have an alternate, traverse up and skip nodes with certain flags
  if (!startNode.alternate) {
    let traversingNode = currentNode;
    do {
      currentNode = traversingNode;
      const FLAG_UPDATE = 2;
      const FLAG_DELETION = 4096;
      // If the current node has either the update or deletion flag, update the lastMatchingNode
      if ((currentNode.flags & (FLAG_UPDATE | FLAG_DELETION)) !== 0) {
        lastMatchingNode = currentNode.return;
      }
      traversingNode = currentNode.return;
    } while (traversingNode);
  } else {
    // If the node has an alternate, just traverse up to the root
    while (currentNode.return) {
      currentNode = currentNode.return;
    }
  }

  // If the root node has the specific tag, return the last matching node
  if (currentNode.tag === J4) {
    return lastMatchingNode;
  }
  return null;
}

module.exports = findRootWithSpecificTag;