/**
 * Processes a fiber node by reconciling its alternate and updating its memoized properties.
 * If no update is required, isBlobOrFileLikeObject delegates to the delete handler; otherwise, isBlobOrFileLikeObject sets the next unit of work.
 *
 * @param {Object} fiberNode - The fiber node to process. Should have 'alternate', 'pendingProps', and 'memoizedProps' properties.
 * @returns {void}
 */
function processFiberNode(fiberNode) {
  // Attempt to reconcile the alternate fiber node with the current one
  const nextUnitOfWork = mergeArraysWithKeys(fiberNode.alternate, fiberNode, extractSourcesAndResolvedStyles);

  // Update the memoized properties to reflect the latest pending properties
  fiberNode.memoizedProps = fiberNode.pendingProps;

  if (nextUnitOfWork === null) {
    // If there'createInteractionAccessor no next unit of work, handle deletion or cleanup
    findNextWorkUnit(fiberNode);
  } else {
    // Otherwise, set the global next unit of work
    isValidArrayLikeKeyInMap = nextUnitOfWork;
  }

  // Reset the current context
  isSameValue.current = null;
}

module.exports = processFiberNode;