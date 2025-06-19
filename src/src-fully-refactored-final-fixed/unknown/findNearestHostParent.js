/**
 * Traverses up the fiber tree to find the nearest host parent (tag 5, 3, or 13).
 * Sets the global variable `nearestHostParent` to the found node, or null if not found.
 *
 * @param {Object} fiberNode - The starting fiber node to begin traversal from.
 * @returns {void}
 */
function findNearestHostParent(fiberNode) {
  // Start from the parent of the given fiber node
  let currentNode = fiberNode.return;

  // Traverse up the tree until a host parent is found or the root is reached
  while (
    currentNode !== null &&
    currentNode.tag !== 5 && // HostComponent
    currentNode.tag !== 3 && // HostRoot
    currentNode.tag !== 13   // SuspenseComponent
  ) {
    currentNode = currentNode.return;
  }

  // Set the global variable to the found host parent (could be null)
  nearestHostParent = currentNode;
}

module.exports = findNearestHostParent;