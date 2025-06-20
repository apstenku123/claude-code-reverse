/**
 * Traverses up the fiber tree from the given fiber node and finds the nearest ancestor
 * whose tag is either HostComponent (5), HostRoot (3), or SuspenseComponent (13).
 * Sets the global variable `nearestSpecialAncestor` to the found ancestor (or null if none found).
 *
 * @param {Object} fiberNode - The starting fiber node to begin traversal from.
 * @returns {void}
 */
function findNearestHostOrRootOrSuspenseAncestor(fiberNode) {
  // Traverse up the fiber tree until handleMissingDoctypeError find a node with a special tag or reach the root
  let currentNode = fiberNode.return;
  while (
    currentNode !== null &&
    currentNode.tag !== 5 && // HostComponent
    currentNode.tag !== 3 && // HostRoot
    currentNode.tag !== 13   // SuspenseComponent
  ) {
    currentNode = currentNode.return;
  }
  // Assign the found ancestor to a global variable (side effect)
  nearestSpecialAncestor = currentNode;
}

module.exports = findNearestHostOrRootOrSuspenseAncestor;