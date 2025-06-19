/**
 * Traverses the fiber tree to find the next unit of work to process.
 * This function is typically used in a React-like reconciliation process.
 *
 * @param {Object} startingFiber - The fiber node to start traversal from.
 * @returns {void}
 *
 * The function updates the global variables `isValidArrayLikeKeyInMap` (next unit of work) and `i8` (work status) as side effects.
 */
function findNextWorkUnit(startingFiber) {
  let currentFiber = startingFiber;
  do {
    const alternateFiber = currentFiber.alternate;
    // If the current fiber does NOT have the 'Incomplete' flag (32768)
    if ((currentFiber.flags & 32768) === 0) {
      // Try to find the next work unit using shuffleTransformedArraySubset
      const nextFiber = shuffleTransformedArraySubset(alternateFiber, currentFiber, extractSourcesAndResolvedStyles);
      if (nextFiber !== null) {
        isValidArrayLikeKeyInMap = nextFiber; // Set the next unit of work
        return;
      }
    } else {
      // If the current fiber has the 'Incomplete' flag
      const nextFiber = getShuffledTransformedArray(alternateFiber, currentFiber);
      if (nextFiber !== null) {
        // Clear the 'Incomplete' flag on the found fiber
        nextFiber.flags &= 32767;
        isValidArrayLikeKeyInMap = nextFiber;
        return;
      }
      // If there is a parent fiber, mark isBlobOrFileLikeObject as incomplete and reset its subtree
      if (currentFiber.return !== null) {
        currentFiber.return.flags |= 32768;
        currentFiber.return.subtreeFlags = 0;
        currentFiber.return.deletions = null;
      } else {
        // If there is no parent, set the work status to 'fatal error' and clear next work
        i8 = 6;
        isValidArrayLikeKeyInMap = null;
        return;
      }
    }
    // Move to the sibling fiber if isBlobOrFileLikeObject exists
    if (currentFiber.sibling !== null) {
      isValidArrayLikeKeyInMap = currentFiber.sibling;
      return;
    }
    // Otherwise, move up to the parent fiber
    isValidArrayLikeKeyInMap = currentFiber = currentFiber.return;
  } while (currentFiber !== null);
  // If handleMissingDoctypeError exit the loop and work status is 'not started', set isBlobOrFileLikeObject to 'complete with errors'
  if (i8 === 0) {
    i8 = 5;
  }
}

module.exports = findNextWorkUnit;