/**
 * Recursively traverses a fiber tree, performing mount and update operations as needed.
 * Handles special cases for Suspense components and manages state for hydration and mounting.
 *
 * @param {Object} fiberNode - The current fiber node to process.
 * @param {Object} parentFiber - The parent fiber node, used for context during traversal.
 * @param {boolean} traverseSiblings - Whether to traverse sibling nodes after processing the current node.
 * @param {boolean} isHydrating - Indicates if the traversal is part of a hydration process.
 * @returns {void}
 */
function traverseFiberTreeRecursively(fiberNode, parentFiber, traverseSiblings, isHydrating) {
  let currentNode = fiberNode;
  while (currentNode !== null) {
    // Perform any necessary checks or logging for the current node
    NH(currentNode);
    if (sendHttpRequestOverSocket) {
      N2("mountFiberRecursively()", currentNode, parentFiber);
    }

    // Retrieve the alternate node (work-in-progress or current)
    const alternateNode = shouldAdvanceFrameStack(currentNode);
    // Determine if the current node is not the current accessor
    const shouldResetAccessor = !shouldProcessNode(currentNode);
    if (shouldResetAccessor) {
      V5(currentNode, parentFiber);
    }

    // Handle hydration-specific logic
    if (P5) {
      if (isHydrating) {
        const suspenseInstance = getProcessingHandlerByTagOrType(currentNode);
        if (suspenseInstance === saveAndSwapContext) {
          d2.add(currentNode.stateNode);
          isHydrating = false;
        }
      }
    }

    // Check if the current node is a Suspense component
    const isSuspenseComponent = currentNode.tag === configureConsoleOverrides.SuspenseComponent;
    if (isSuspenseComponent) {
      const hasSuspenseState = currentNode.memoizedState !== null;
      if (hasSuspenseState) {
        // If Suspense is currently showing its fallback, traverse the fallback subtree
        const primaryChild = currentNode.child;
        const fallbackSibling = primaryChild ? primaryChild.sibling : null;
        const fallbackChild = fallbackSibling ? fallbackSibling.child : null;
        if (fallbackChild !== null) {
          traverseFiberTreeRecursively(
            fallbackChild,
            shouldResetAccessor ? currentNode : parentFiber,
            true,
            isHydrating
          );
        }
      } else {
        // If Suspense is not showing fallback, traverse the primary subtree
        let subtreeToTraverse = null;
        const isRoot = mQ === -1;
        if (isRoot) {
          subtreeToTraverse = currentNode.child;
        } else if (currentNode.child !== null) {
          subtreeToTraverse = currentNode.child.child;
        }
        if (subtreeToTraverse !== null) {
          traverseFiberTreeRecursively(
            subtreeToTraverse,
            shouldResetAccessor ? currentNode : parentFiber,
            true,
            isHydrating
          );
        }
      }
    } else if (currentNode.child !== null) {
      // Traverse the child subtree for non-Suspense components
      traverseFiberTreeRecursively(
        currentNode.child,
        shouldResetAccessor ? currentNode : parentFiber,
        true,
        isHydrating
      );
    }

    // Perform any necessary cleanup after processing the node
    pw1(alternateNode);
    // Move to the sibling node if requested
    currentNode = traverseSiblings ? currentNode.sibling : null;
  }
}

module.exports = traverseFiberTreeRecursively;