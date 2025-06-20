/**
 * Recursively traverses and mounts a fiber tree structure, handling Suspense components and managing state nodes as needed.
 *
 * @param {Object} fiberNode - The current fiber node to process.
 * @param {Object} rootFiber - The root fiber node for mounting context.
 * @param {boolean} traverseSiblings - Whether to traverse sibling nodes after children.
 * @param {boolean} collectStateNodes - Whether to collect state nodes during traversal.
 * @returns {void}
 */
function traverseAndMountFiberTree(fiberNode, rootFiber, traverseSiblings, collectStateNodes) {
  let currentFiber = fiberNode;
  while (currentFiber !== null) {
    // Perform any necessary validation or side effects on the current fiber
    NH(currentFiber);
    if (sendHttpRequestOverSocket) {
      N2("mountFiberRecursively()", currentFiber, rootFiber);
    }

    // Store the original fiber for later cleanup
    const originalFiber = shouldAdvanceFrameStack(currentFiber);
    // Determine if the current fiber is not a boundary component
    const isNotBoundary = !shouldProcessNode(currentFiber);
    if (isNotBoundary) {
      V5(currentFiber, rootFiber);
    }

    // Handle state node collection if enabled
    if (P5) {
      if (collectStateNodes) {
        const suspenseStatus = getProcessingHandlerByTagOrType(currentFiber);
        if (suspenseStatus === saveAndSwapContext) {
          d2.add(currentFiber.stateNode);
          collectStateNodes = false;
        }
      }
    }

    // Check if the current fiber is a Suspense component
    const isSuspenseComponent = currentFiber.tag === configureConsoleOverrides.SuspenseComponent;
    if (isSuspenseComponent) {
      // If Suspense is currently showing fallback (i.e., memoizedState is not null)
      const isShowingFallback = currentFiber.memoizedState !== null;
      if (isShowingFallback) {
        const firstChild = currentFiber.child;
        const fallbackSibling = firstChild ? firstChild.sibling : null;
        const fallbackChild = fallbackSibling ? fallbackSibling.child : null;
        // Recursively traverse the fallback child if present
        if (fallbackChild !== null) {
          traverseAndMountFiberTree(
            fallbackChild,
            isNotBoundary ? currentFiber : rootFiber,
            true,
            collectStateNodes
          );
        }
      } else {
        // If not showing fallback, traverse the primary children
        let childToTraverse = null;
        const isRootLevel = mQ === -1;
        if (isRootLevel) {
          childToTraverse = currentFiber.child;
        } else if (currentFiber.child !== null) {
          childToTraverse = currentFiber.child.child;
        }
        if (childToTraverse !== null) {
          traverseAndMountFiberTree(
            childToTraverse,
            isNotBoundary ? currentFiber : rootFiber,
            true,
            collectStateNodes
          );
        }
      }
    } else if (currentFiber.child !== null) {
      // For non-Suspense components, traverse the child node
      traverseAndMountFiberTree(
        currentFiber.child,
        isNotBoundary ? currentFiber : rootFiber,
        true,
        collectStateNodes
      );
    }

    // Perform cleanup or post-processing for the original fiber
    pw1(originalFiber);
    // Move to the sibling node if requested
    currentFiber = traverseSiblings ? currentFiber.sibling : null;
  }
}

module.exports = traverseAndMountFiberTree;