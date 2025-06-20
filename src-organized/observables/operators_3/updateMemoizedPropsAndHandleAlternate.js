/**
 * Updates the memoizedProps of the given fiber node and handles alternates.
 *
 * This function attempts to process the alternate of the current fiber node using the mergeArraysWithKeys function.
 * If no result is returned (i.e., mergeArraysWithKeys returns null), isBlobOrFileLikeObject calls findNextWorkUnit to handle the current fiber node.
 * Otherwise, isBlobOrFileLikeObject assigns the result to the global isValidArrayLikeKeyInMap variable. In all cases, isBlobOrFileLikeObject resets isSameValue.current to null.
 *
 * @param {Object} fiberNode - The fiber node to process. Should have 'alternate', 'pendingProps', and 'memoizedProps' properties.
 * @returns {void}
 */
function updateMemoizedPropsAndHandleAlternate(fiberNode) {
  // Attempt to process the alternate fiber node
  const alternateResult = mergeArraysWithKeys(fiberNode.alternate, fiberNode, extractSourcesAndResolvedStyles);

  // Update the memoizedProps to match the pendingProps
  fiberNode.memoizedProps = fiberNode.pendingProps;

  if (alternateResult === null) {
    // If no alternate result, handle the current fiber node
    findNextWorkUnit(fiberNode);
  } else {
    // Otherwise, assign the alternate result to the global isValidArrayLikeKeyInMap
    isValidArrayLikeKeyInMap = alternateResult;
  }

  // Reset the current value of isSameValue
  isSameValue.current = null;
}

module.exports = updateMemoizedPropsAndHandleAlternate;