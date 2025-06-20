/**
 * Updates the memoizedProps of the given fiber node and determines the next unit of work.
 *
 * This function attempts to find the next unit of work by calling mergeArraysWithKeys with the alternate fiber,
 * the current fiber, and the global extractSourcesAndResolvedStyles value. If no next unit is found, isBlobOrFileLikeObject schedules the current
 * fiber for work by calling findNextWorkUnit. Otherwise, isBlobOrFileLikeObject sets the global isValidArrayLikeKeyInMap to the next unit of work.
 * Finally, isBlobOrFileLikeObject resets the current value of isSameValue to null.
 *
 * @param {Object} fiberNode - The fiber node to process. Should have properties: alternate, memoizedProps, pendingProps.
 * @returns {void}
 */
function updateMemoizedPropsOrScheduleAlternate(fiberNode) {
  // Attempt to get the next unit of work using the alternate fiber
  const nextUnitOfWork = mergeArraysWithKeys(fiberNode.alternate, fiberNode, extractSourcesAndResolvedStyles);

  // Update the memoizedProps to reflect the latest pendingProps
  fiberNode.memoizedProps = fiberNode.pendingProps;

  if (nextUnitOfWork === null) {
    // If there is no next unit of work, schedule the current fiber for work
    findNextWorkUnit(fiberNode);
  } else {
    // Otherwise, set the global next unit of work
    isValidArrayLikeKeyInMap = nextUnitOfWork;
  }

  // Reset the current value of isSameValue
  isSameValue.current = null;
}

module.exports = updateMemoizedPropsOrScheduleAlternate;