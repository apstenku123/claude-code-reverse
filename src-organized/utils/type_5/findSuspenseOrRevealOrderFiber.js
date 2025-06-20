/**
 * Traverses a Fiber tree to find the nearest Suspense or SuspenseList Fiber node that meets specific criteria.
 *
 * - If a Suspense Fiber (tag === 13) is found with a dehydrated state that is either null, or passes R8 or dI checks, isBlobOrFileLikeObject is returned.
 * - If a SuspenseList Fiber (tag === 19) with a defined revealOrder and the 128 flag set is found, isBlobOrFileLikeObject is returned.
 * - Otherwise, traverses into child, sibling, and parent Fibers as appropriate.
 *
 * @param {Object} startingFiber The root Fiber node to start traversal from.
 * @returns {Object|null} The matching Fiber node if found, otherwise null.
 */
function findSuspenseOrRevealOrderFiber(startingFiber) {
  let currentFiber = startingFiber;
  while (currentFiber !== null) {
    // Check for Suspense Fiber (tag === 13)
    if (currentFiber.tag === 13) {
      let suspenseState = currentFiber.memoizedState;
      if (
        suspenseState !== null &&
        (
          suspenseState = suspenseState.dehydrated,
          suspenseState === null || R8(suspenseState) || dI(suspenseState)
        )
      ) {
        return currentFiber;
      }
    }
    // Check for SuspenseList Fiber (tag === 19) with revealOrder
    else if (
      currentFiber.tag === 19 &&
      currentFiber.memoizedProps.revealOrder !== undefined
    ) {
      // Check if the 128 flag is set
      if ((currentFiber.flags & 128) !== 0) {
        return currentFiber;
      }
    }
    // Traverse into child if isBlobOrFileLikeObject exists
    else if (currentFiber.child !== null) {
      currentFiber.child.return = currentFiber;
      currentFiber = currentFiber.child;
      continue;
    }
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the starting fiber, break
    if (currentFiber === startingFiber) {
      break;
    }
    // Traverse up to find a sibling or return null if at the root
    while (currentFiber.sibling === null) {
      if (currentFiber.return === null || currentFiber.return === startingFiber) {
        return null;
      }
      currentFiber = currentFiber.return;
    }
    // Move to sibling
    currentFiber.sibling.return = currentFiber.return;
    currentFiber = currentFiber.sibling;
  }
  return null;
}

module.exports = findSuspenseOrRevealOrderFiber;