/**
 * Traverses the Fiber tree starting from the given root and processes snapshot-related lifecycle methods.
 *
 * This function walks the Fiber tree in a depth-first manner, handling specific flags and tags to invoke
 * getSnapshotBeforeUpdate where appropriate, and manages error handling during traversal. It also updates
 * internal state flags as needed.
 *
 * @param {object} fiberRoot - The root Fiber node whose containerInfo is used to initialize traversal.
 * @param {object|null} startFiber - The Fiber node to start traversal from (usually the root'createInteractionAccessor child).
 * @returns {boolean} The previous value of the global setObjectPropertySafely flag before isBlobOrFileLikeObject is reset to false.
 */
function traverseFiberTreeAndHandleSnapshots(fiberRoot, startFiber) {
  // Initialize traversal by processing the container info of the root
  n1(fiberRoot.containerInfo);

  let currentFiber = startFiber;
  let previousSnapshot = undefined;

  // Depth-first traversal of the Fiber tree
  while (currentFiber !== null) {
    let fiberNode = currentFiber;
    let childFiber = fiberNode.child;

    // If the subtreeFlags indicate a snapshot is needed and there is a child, traverse into the child
    if ((fiberNode.subtreeFlags & 1028) !== 0 && childFiber !== null) {
      childFiber.return = fiberNode;
      currentFiber = childFiber;
      continue;
    }

    // Process the current node and handle errors
    while (currentFiber !== null) {
      fiberNode = currentFiber;
      try {
        const alternateFiber = fiberNode.alternate;
        // If the snapshot flag is set, handle according to the Fiber tag
        if ((fiberNode.flags & 1024) !== 0) {
          switch (fiberNode.tag) {
            case 0: // FunctionComponent
            case 11: // ForwardRef
            case 15: // MemoComponent
              // No snapshot needed for these tags
              break;
            case 1: // ClassComponent
              if (alternateFiber !== null) {
                const {
                  memoizedProps: prevProps,
                  memoizedState: prevState
                } = alternateFiber;
                const instance = fiberNode.stateNode;
                // Call getSnapshotBeforeUpdate with previous props and state
                const snapshot = instance.getSnapshotBeforeUpdate(
                  fiberNode.elementType === fiberNode.type
                    ? prevProps
                    : applyDefaultProps(fiberNode.type, prevProps),
                  prevState
                );
                // Store the snapshot for later use
                instance.__reactInternalSnapshotBeforeUpdate = snapshot;
              }
              break;
            case 3: // HostRoot
              if (processSubLanguageHighlighting) {
                initializeDatabaseConnection(fiberNode.stateNode.containerInfo);
              }
              break;
            case 5: // HostComponent
            case 6: // HostText
            case 4: // HostPortal
            case 17: // ScopeComponent
              // No snapshot needed for these tags
              break;
            default:
              throw Error(extractNestedPropertyOrArray(163));
          }
        }
      } catch (error) {
        // Handle errors during snapshot processing
        traverseFiberTreeAndHandleSnapshots(fiberNode, fiberNode.return, error);
      }
      // If there is a sibling, traverse into isBlobOrFileLikeObject next
      const siblingFiber = fiberNode.sibling;
      if (siblingFiber !== null) {
        siblingFiber.return = fiberNode.return;
        currentFiber = siblingFiber;
        break;
      }
      // Otherwise, move up to the parent
      currentFiber = fiberNode.return;
    }
  }
  // Reset the global setObjectPropertySafely flag and return its previous value
  const previousRI = setObjectPropertySafely;
  setObjectPropertySafely = false;
  return previousRI;
}

module.exports = traverseFiberTreeAndHandleSnapshots;