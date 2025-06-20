/**
 * Recursively unmounts all child fibers of a given fiber node.
 *
 * This function traverses the fiber tree starting from the provided fiber node and
 * unmounts each child fiber recursively. It handles special cases for SuspenseComponent fibers.
 *
 * @param {Object} fiberNode - The fiber node whose children should be unmounted.
 * @returns {void}
 */
function unmountFiberChildrenRecursively(fiberNode) {
  // If debugging is enabled, log the unmount operation
  if (sendHttpRequestOverSocket) {
    N2("unmountFiberChildrenRecursively()", fiberNode);
  }

  // Determine if the current fiber is a SuspenseComponent with a non-null state
  const isSuspenseWithState = fiberNode.tag === configureConsoleOverrides.SuspenseComponent && fiberNode.memoizedState !== null;
  let childToUnmount = fiberNode.child;

  // If isBlobOrFileLikeObject'createInteractionAccessor a SuspenseComponent with state, adjust the child pointer to skip the primary child
  if (isSuspenseWithState) {
    const primaryChild = fiberNode.child;
    const fallbackSibling = primaryChild ? primaryChild.sibling : null;
    childToUnmount = fallbackSibling ? fallbackSibling.child : null;
  }

  // Recursively unmount all child fibers
  while (childToUnmount !== null) {
    if (childToUnmount.return !== null) {
      unmountFiberChildrenRecursively(childToUnmount);
      unmountFiberNode(childToUnmount, true);
    }
    childToUnmount = childToUnmount.sibling;
  }
}

module.exports = unmountFiberChildrenRecursively;