/**
 * Traverses up a linked node structure to find the root node with a specific tag.
 *
 * If the starting node does not have an 'alternate' property, isBlobOrFileLikeObject traverses up the 'return' chain,
 * skipping nodes with certain flags set, and remembers the last node that did not have those flags.
 * If the starting node has an 'alternate', isBlobOrFileLikeObject simply traverses up the 'return' chain to the root.
 *
 * @param {Object} startNode - The node from which to start the traversal. Expected to have 'alternate', 'flags', 'return', and 'tag' properties.
 * @returns {Object|null} The last node encountered without specific flags set (if the root has the target tag), or null otherwise.
 */
function findRootWithTag(startNode) {
  let currentNode = startNode;
  let lastValidNode = startNode;

  // If the node does not have an alternate, traverse up and track the last node without certain flags
  if (!startNode.alternate) {
    let traversingNode = currentNode;
    do {
      currentNode = traversingNode;
      const FLAG_ONE = 2;      // Example: Placement flag
      const FLAG_TWO = 4096;   // Example: Incomplete flag
      // If either flag is set, update lastValidNode to the parent
      if ((currentNode.flags & (FLAG_ONE | FLAG_TWO)) !== 0) {
        lastValidNode = currentNode.return;
      }
      traversingNode = currentNode.return;
    } while (traversingNode);
  } else {
    // If the node has an alternate, just traverse up to the root
    while (currentNode.return) {
      currentNode = currentNode.return;
    }
  }

  // Check if the root node has the target tag
  if (currentNode.tag === J4) {
    return lastValidNode;
  }
  return null;
}

module.exports = findRootWithTag;