/**
 * Traverses up the fiber tree from the given fiber node and finds the nearest ancestor
 * whose tag indicates a HostComponent (tag === 5), HostRoot (tag === 3), or SuspenseComponent (tag === 13).
 * Sets the global variable `nearestHostOrRootFiber` to the found ancestor fiber node (or null if not found).
 *
 * @param {Object} fiberNode - The starting fiber node to begin traversal from.
 * @returns {void}
 */
function findNearestHostOrRootFiber(fiberNode) {
  // Traverse up the fiber tree until a node with tag 5, 3, or 13 is found, or until the root is reached
  let currentFiber = fiberNode.return;
  while (
    currentFiber !== null &&
    currentFiber.tag !== 5 && // HostComponent
    currentFiber.tag !== 3 && // HostRoot
    currentFiber.tag !== 13   // SuspenseComponent
  ) {
    currentFiber = currentFiber.return;
  }
  // Assign the found fiber node to the global variable (preserving original behavior)
  nearestHostOrRootFiber = currentFiber;
}

module.exports = findNearestHostOrRootFiber;