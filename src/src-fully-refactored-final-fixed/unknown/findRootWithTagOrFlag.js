/**
 * Traverses up a tree of nodes to find the root node with a specific tag (J4),
 * or the nearest ancestor with certain flags set if the node has no alternate.
 *
 * @param {Object} node - The starting node to traverse from. Expected to have 'alternate', 'flags', 'return', and 'tag' properties.
 * @returns {Object|null} - Returns the found node if its tag matches J4, otherwise null.
 */
function findRootWithTagOrFlag(node) {
  let currentNode = node;
  let candidateNode = node;

  // If the node does not have an alternate, traverse up the tree
  if (!node.alternate) {
    let traversingNode = currentNode;
    do {
      currentNode = traversingNode;
      const FLAG_ONE = 2; // Example flag value
      const FLAG_TWO = 4096; // Example flag value
      // If currentNode has either flag set, update candidateNode
      if ((currentNode.flags & (FLAG_ONE | FLAG_TWO)) !== 0) {
        candidateNode = currentNode.return;
      }
      traversingNode = currentNode.return;
    } while (traversingNode);
  } else {
    // If the node has an alternate, just traverse up to the root
    while (currentNode.return) {
      currentNode = currentNode.return;
    }
  }

  // If the found node'createInteractionAccessor tag matches J4, return the candidateNode
  if (currentNode.tag === J4) {
    return candidateNode;
  }
  // Otherwise, return null
  return null;
}

module.exports = findRootWithTagOrFlag;