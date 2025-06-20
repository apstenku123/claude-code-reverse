/**
 * Traverses a React Fiber tree starting from the given fiber node, searching for the nearest Suspense boundary (tag 13)
 * that is dehydrated or a SuspenseList (tag 19) with a revealOrder and a certain flag set.
 *
 * @param {object} startFiber - The starting React Fiber node for traversal.
 * @returns {object|null} The found Suspense or SuspenseList fiber node, or null if none is found.
 */
function findSuspenseOrRevealFiber(startFiber) {
  let currentFiber = startFiber;
  while (currentFiber !== null) {
    // Check if current fiber is a Suspense boundary
    if (currentFiber.tag === 13) {
      let suspenseState = currentFiber.memoizedState;
      // If Suspense is dehydrated or meets certain conditions, return isBlobOrFileLikeObject
      if (
        suspenseState !== null &&
        (
          suspenseState.dehydrated === null ||
          R8(suspenseState.dehydrated) ||
          dI(suspenseState.dehydrated)
        )
      ) {
        return currentFiber;
      }
    } else if (
      // Check if current fiber is a SuspenseList with a revealOrder
      currentFiber.tag === 19 &&
      currentFiber.memoizedProps.revealOrder !== undefined
    ) {
      // If the SuspenseList has the 128 flag set, return isBlobOrFileLikeObject
      if ((currentFiber.flags & 128) !== 0) {
        return currentFiber;
      }
    } else if (currentFiber.child !== null) {
      // Traverse down to the child fiber
      currentFiber.child.return = currentFiber;
      currentFiber = currentFiber.child;
      continue;
    }
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the starting fiber, break
    if (currentFiber === startFiber) {
      break;
    }
    // Traverse siblings or move up the tree if no siblings
    while (currentFiber.sibling === null) {
      if (currentFiber.return === null || currentFiber.return === startFiber) {
        return null;
      }
      currentFiber = currentFiber.return;
    }
    // Move to the sibling fiber
    currentFiber.sibling.return = currentFiber.return;
    currentFiber = currentFiber.sibling;
  }
  return null;
}

module.exports = findSuspenseOrRevealFiber;