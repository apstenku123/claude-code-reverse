/**
 * Traverses the Fiber tree to handle getSnapshotBeforeUpdate lifecycle hooks.
 *
 * This function walks through the Fiber tree starting from the given rootFiber and currentFiber,
 * and for each Fiber node, isBlobOrFileLikeObject checks if the getSnapshotBeforeUpdate lifecycle should be called.
 * It also handles errors and manages traversal state.
 *
 * @param {Object} rootFiber - The root Fiber node (typically the root of the React tree).
 * @param {Object} currentFiber - The starting Fiber node for traversal.
 * @returns {boolean} - The previous value of the global setObjectPropertySafely flag.
 */
function traverseFiberTreeForSnapshotBeforeUpdate(rootFiber, currentFiber) {
  // Ensure the container info is set up for the root Fiber
  n1(rootFiber.containerInfo);

  let traversalNode = currentFiber;
  let previousSnapshot = undefined;

  // Traverse the Fiber tree
  while (traversalNode !== null) {
    let fiber = traversalNode;
    let child = fiber.child;

    // If the subtree has the SnapshotBeforeUpdate flag and has children, traverse down
    if ((fiber.subtreeFlags & 1028) !== 0 && child !== null) {
      child.return = fiber;
      traversalNode = child;
    } else {
      // Otherwise, process the current node and traverse siblings or up the tree
      while (traversalNode !== null) {
        fiber = traversalNode;
        try {
          const alternate = fiber.alternate;
          // If the Fiber has the SnapshotBeforeUpdate flag
          if ((fiber.flags & 1024) !== 0) {
            switch (fiber.tag) {
              case 0: // FunctionComponent
              case 11: // ForwardRef
              case 15: // MemoComponent
                // These do not use getSnapshotBeforeUpdate
                break;
              case 1: // ClassComponent
                if (alternate !== null) {
                  // Prepare previous props and state
                  const {
                    memoizedProps: prevProps,
                    memoizedState: prevState
                  } = alternate;
                  const instance = fiber.stateNode;
                  // Call getSnapshotBeforeUpdate with correct props
                  const snapshot = instance.getSnapshotBeforeUpdate(
                    fiber.elementType === fiber.type ? prevProps : applyDefaultProps(fiber.type, prevProps),
                    prevState
                  );
                  // Store the snapshot on the instance for later use
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                }
                break;
              case 3: // HostRoot
                if (processSubLanguageHighlighting) {
                  // Special handling for HostRoot
                  initializeDatabaseConnection(fiber.stateNode.containerInfo);
                }
                break;
              case 5: // HostComponent
              case 6: // HostText
              case 4: // HostPortal
              case 17: // ScopeComponent
                // No special handling needed
                break;
              default:
                // Unknown tag, throw error
                throw Error(extractNestedPropertyOrArray(163));
            }
          }
        } catch (error) {
          // Handle errors during lifecycle
          traverseFiberTreeForSnapshotBeforeUpdate(fiber, fiber.return, error);
        }
        // Traverse to sibling if exists, otherwise go up the tree
        const sibling = fiber.sibling;
        if (sibling !== null) {
          sibling.return = fiber.return;
          traversalNode = sibling;
          break;
        }
        traversalNode = fiber.return;
      }
    }
  }
  // Restore and return the previous value of setObjectPropertySafely
  const previousRI = setObjectPropertySafely;
  setObjectPropertySafely = false;
  return previousRI;
}

module.exports = traverseFiberTreeForSnapshotBeforeUpdate;