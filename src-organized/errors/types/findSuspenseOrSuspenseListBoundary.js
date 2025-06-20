/**
 * Traverses a fiber tree to find the nearest Suspense or SuspenseList boundary that is in a specific state.
 *
 * @param {object} startFiber - The starting fiber node for traversal.
 * @returns {object|null} The found Suspense or SuspenseList fiber boundary, or null if none found.
 *
 * This function walks the fiber tree starting from `startFiber`, looking for:
 *   - a Suspense boundary (tag === 13) that is dehydrated or in a certain state
 *   - a SuspenseList boundary (tag === 19) with a revealOrder and a specific flag
 * It uses depth-first traversal, descending into children and siblings as needed.
 */
function findSuspenseOrSuspenseListBoundary(startFiber) {
  let currentFiber = startFiber;
  while (currentFiber !== null) {
    // Check for Suspense boundary (tag === 13)
    if (currentFiber.tag === 13) {
      let suspenseState = currentFiber.memoizedState;
      if (
        suspenseState !== null &&
        (
          // Check if dehydrated is null, or passes R8 or dI
          (suspenseState = suspenseState.dehydrated, suspenseState === null || R8(suspenseState) || dI(suspenseState))
        )
      ) {
        return currentFiber;
      }
    }
    // Check for SuspenseList boundary (tag === 19) with revealOrder
    else if (
      currentFiber.tag === 19 &&
      currentFiber.memoizedProps.revealOrder !== undefined
    ) {
      // Check if the boundary has the "fallback" flag (128)
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
    // If handleMissingDoctypeError'removeTrailingCharacters returned to the start, break
    if (currentFiber === startFiber) {
      break;
    }
    // Traverse up to find a sibling or return null if no more siblings
    while (currentFiber.sibling === null) {
      if (currentFiber.return === null || currentFiber.return === startFiber) {
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

module.exports = findSuspenseOrSuspenseListBoundary;