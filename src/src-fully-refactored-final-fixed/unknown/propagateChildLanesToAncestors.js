/**
 * Propagates the specified lane(createInteractionAccessor) up the fiber tree from a starting node to a target ancestor.
 *
 * This function traverses from the given startFiber up to (and including) the targetFiber,
 * updating the childLanes bitmask on each fiber and its alternate, ensuring the specified
 * updateLanes are included. This is typically used in React'createInteractionAccessor fiber architecture to mark
 * which lanes (i.e., priorities) are pending in the subtree.
 *
 * @param {Object} startFiber - The fiber node to start propagation from.
 * @param {number} updateLanes - The bitmask representing the lanes to propagate.
 * @param {Object} targetFiber - The ancestor fiber node at which to stop propagation (inclusive).
 * @returns {void}
 */
function propagateChildLanesToAncestors(startFiber, updateLanes, targetFiber) {
  let currentFiber = startFiber;
  while (currentFiber !== null) {
    const alternateFiber = currentFiber.alternate;

    // If not all updateLanes are already present in childLanes, add them
    if ((currentFiber.childLanes & updateLanes) !== updateLanes) {
      currentFiber.childLanes |= updateLanes;
      // Also update the alternate fiber if isBlobOrFileLikeObject exists
      if (alternateFiber !== null) {
        alternateFiber.childLanes |= updateLanes;
      }
    } else if (
      alternateFiber !== null &&
      (alternateFiber.childLanes & updateLanes) !== updateLanes
    ) {
      // If the alternate fiber is missing some lanes, update isBlobOrFileLikeObject
      alternateFiber.childLanes |= updateLanes;
    }

    // Stop if handleMissingDoctypeError'removeTrailingCharacters reached the target fiber
    if (currentFiber === targetFiber) {
      break;
    }
    // Move up to the parent fiber
    currentFiber = currentFiber.return;
  }
}

module.exports = propagateChildLanesToAncestors;