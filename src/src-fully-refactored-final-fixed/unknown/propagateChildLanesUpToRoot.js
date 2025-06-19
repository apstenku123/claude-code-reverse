/**
 * Propagates the specified lane bitmask up the fiber tree from a starting node to a root node.
 * For each fiber from startFiber up to (and including) rootFiber, ensures that the childLanes bitmask includes the specified lanes.
 * Also updates the alternate fiber'createInteractionAccessor childLanes if present.
 *
 * @param {Object} startFiber - The fiber node to start propagation from.
 * @param {number} laneMask - The bitmask representing the lanes to propagate.
 * @param {Object} rootFiber - The fiber node at which to stop propagation (inclusive).
 * @returns {void}
 */
function propagateChildLanesUpToRoot(startFiber, laneMask, rootFiber) {
  let currentFiber = startFiber;
  while (currentFiber !== null) {
    const alternateFiber = currentFiber.alternate;

    // If the current fiber'createInteractionAccessor childLanes does not already include all lanes in laneMask
    if ((currentFiber.childLanes & laneMask) !== laneMask) {
      // Add the missing lanes to the current fiber
      currentFiber.childLanes |= laneMask;
      // If the alternate fiber exists, also add the missing lanes
      if (alternateFiber !== null) {
        alternateFiber.childLanes |= laneMask;
      }
    } else if (
      // If the alternate fiber exists and its childLanes does not include all lanes in laneMask
      alternateFiber !== null && (alternateFiber.childLanes & laneMask) !== laneMask
    ) {
      // Add the missing lanes to the alternate fiber
      alternateFiber.childLanes |= laneMask;
    }

    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the root fiber
    if (currentFiber === rootFiber) {
      break;
    }
    // Move up to the parent fiber
    currentFiber = currentFiber.return;
  }
}

module.exports = propagateChildLanesUpToRoot;