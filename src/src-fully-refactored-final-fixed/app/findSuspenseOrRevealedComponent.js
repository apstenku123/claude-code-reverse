/**
 * Traverses a React Fiber tree starting from the given node, searching for a Suspense boundary
 * (tag 13) that is dehydrated or a SuspenseList (tag 19) with a revealOrder and a specific flag set.
 * Returns the matching Fiber node if found, otherwise returns null.
 *
 * @param {object} startFiber - The starting Fiber node to begin traversal from.
 * @returns {object|null} The matching Suspense or SuspenseList Fiber node, or null if not found.
 */
function findSuspenseOrRevealedComponent(startFiber) {
  let currentFiber = startFiber;
  while (currentFiber !== null) {
    // Check if currentFiber is a Suspense boundary
    if (currentFiber.tag === 13) {
      let memoizedState = currentFiber.memoizedState;
      if (
        memoizedState !== null &&
        (
          // Check if dehydrated is null or matches R8/dI
          (
            memoizedState.dehydrated === null ||
            R8(memoizedState.dehydrated) ||
            dI(memoizedState.dehydrated)
          )
        )
      ) {
        return currentFiber;
      }
    }
    // Check if currentFiber is a SuspenseList with revealOrder
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
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the starting node, break
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
    currentFiber.sibling.return = currentFiber.return;
    currentFiber = currentFiber.sibling;
  }
  return null;
}

module.exports = findSuspenseOrRevealedComponent;