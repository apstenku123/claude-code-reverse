/**
 * Recursively mounts a fiber tree, handling Suspense components and managing state as needed.
 *
 * @param {Object} fiberNode - The current fiber node to process.
 * @param {Object} parentFiber - The parent fiber node, used for context during recursion.
 * @param {boolean} traverseSiblings - Whether to traverse sibling nodes after processing children.
 * @param {boolean} shouldTrackStateNode - Whether to track the stateNode for hydration or other purposes.
 * @returns {void}
 */
function mountFiberTreeRecursively(fiberNode, parentFiber, traverseSiblings, shouldTrackStateNode) {
  let currentFiber = fiberNode;
  while (currentFiber !== null) {
    // Perform a check on the current fiber node (side effect, e.g., for debugging or validation)
    NH(currentFiber);
    if (sendHttpRequestOverSocket) {
      isValueNullOrMatchesCriteria("mountFiberRecursively()", currentFiber, parentFiber);
    }

    // Save the next sibling before potentially mutating the tree
    const nextSibling = shouldAdvanceFrameStack(currentFiber);
    // Determine if the current fiber is not a container/root
    const isNotContainer = !shouldProcessNode(currentFiber);
    if (isNotContainer) {
      V5(currentFiber, parentFiber);
    }

    // If global flag P5 is set, and shouldTrackStateNode is true, check for hydration
    if (P5) {
      if (shouldTrackStateNode) {
        const suspenseInstance = getProcessingHandlerByTagOrType(currentFiber);
        if (suspenseInstance === saveAndSwapContext) {
          d2.add(currentFiber.stateNode);
          shouldTrackStateNode = false;
        }
      }
    }

    // Check if the current fiber is a Suspense component
    const isSuspenseComponent = currentFiber.tag === configureConsoleOverrides.SuspenseComponent;
    if (isSuspenseComponent) {
      const hasSuspenseState = currentFiber.memoizedState !== null;
      if (hasSuspenseState) {
        // If Suspense is currently showing fallback, recurse into the fallback child
        const primaryChild = currentFiber.child;
        const fallbackSibling = primaryChild ? primaryChild.sibling : null;
        const fallbackChild = fallbackSibling ? fallbackSibling.child : null;
        if (fallbackChild !== null) {
          mountFiberTreeRecursively(
            fallbackChild,
            isNotContainer ? currentFiber : parentFiber,
            true,
            shouldTrackStateNode
          );
        }
      } else {
        // If Suspense is not showing fallback, recurse into the primary child
        let suspenseChild = null;
        const isNotInFallback = mQ === -1;
        if (isNotInFallback) {
          suspenseChild = currentFiber.child;
        } else if (currentFiber.child !== null) {
          suspenseChild = currentFiber.child.child;
        }
        if (suspenseChild !== null) {
          mountFiberTreeRecursively(
            suspenseChild,
            isNotContainer ? currentFiber : parentFiber,
            true,
            shouldTrackStateNode
          );
        }
      }
    } else if (currentFiber.child !== null) {
      // For non-Suspense components, recurse into the child
      mountFiberTreeRecursively(
        currentFiber.child,
        isNotContainer ? currentFiber : parentFiber,
        true,
        shouldTrackStateNode
      );
    }

    // Perform any cleanup or finalization for the current fiber
    pw1(nextSibling);
    // Move to the next sibling if requested
    currentFiber = traverseSiblings ? currentFiber.sibling : null;
  }
}

module.exports = mountFiberTreeRecursively;