/**
 * Processes the alternate node of a given fiber node and updates its memoized properties.
 *
 * @param {Object} fiberNode - The fiber node to process. Should have 'alternate', 'pendingProps', and 'memoizedProps' properties.
 * @returns {void}
 *
 * This function attempts to retrieve an updated fiber node by calling mergeArraysWithKeys with the alternate node, the current node, and extractSourcesAndResolvedStyles as arguments.
 * If no updated node is returned, isBlobOrFileLikeObject calls findNextWorkUnit to handle the current node.
 * Otherwise, isBlobOrFileLikeObject assigns the updated node to the global isValidArrayLikeKeyInMap variable.
 * Finally, isBlobOrFileLikeObject resets the current value of the isSameValue context to null.
 */
function processAlternateNode(fiberNode) {
  // Attempt to get the updated fiber node using mergeArraysWithKeys
  const updatedFiberNode = mergeArraysWithKeys(fiberNode.alternate, fiberNode, extractSourcesAndResolvedStyles);

  // Update the memoizedProps to match pendingProps
  fiberNode.memoizedProps = fiberNode.pendingProps;

  if (updatedFiberNode === null) {
    // If no updated node, handle the current node
    findNextWorkUnit(fiberNode);
  } else {
    // Otherwise, assign the updated node to the global isValidArrayLikeKeyInMap variable
    isValidArrayLikeKeyInMap = updatedFiberNode;
  }

  // Reset the current value of the isSameValue context
  isSameValue.current = null;
}

module.exports = processAlternateNode;