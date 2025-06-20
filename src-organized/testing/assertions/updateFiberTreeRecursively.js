/**
 * Recursively updates and compares fiber nodes in a tree, handling state, alternates, and side effects.
 * This function is typically used in a React-like reconciliation process to determine if fibers (nodes) need to be updated,
 * have their children traversed, or if side effects (like marking nodes for update) should be triggered.
 *
 * @param {Object} currentFiber - The fiber node currently being processed.
 * @param {Object} previousFiber - The previous (alternate) fiber node for comparison.
 * @param {Object} parentFiber - The parent fiber node, used as a fallback for traversal.
 * @param {boolean} shouldTrackSideEffects - Whether to track and collect side effects during traversal.
 * @returns {boolean} - Returns true if an update is needed, false otherwise.
 */
function updateFiberTreeRecursively(currentFiber, previousFiber, parentFiber, shouldTrackSideEffects) {
  const currentFiberId = NH(currentFiber);

  // Debug logging if enabled
  if (sendHttpRequestOverSocket) {
    N2("updateFiberRecursively()", currentFiber, parentFiber);
  }

  // Side effect tracking for certain fiber types
  if (P5) {
    const currentFiberType = getProcessingHandlerByTagOrType(currentFiber);
    if (shouldTrackSideEffects) {
      if (currentFiberType === saveAndSwapContext) {
        d2.add(currentFiber.stateNode);
        shouldTrackSideEffects = false;
      }
    } else if (
      currentFiberType === processHtmlElement ||
      currentFiberType === d6 ||
      currentFiberType === handleDomNodeInsertion ||
      currentFiberType === updateBitwiseStateAndEncode ||
      currentFiberType === handleElementProcessing
    ) {
      shouldTrackSideEffects = havePropsOrStateChanged(previousFiber, currentFiber);
    }
  }

  // Mark global update flag if matching global fiber and update is needed
  if (
    GG !== null &&
    GG.id === currentFiberId &&
    havePropsOrStateChanged(previousFiber, currentFiber)
  ) {
    Cq = true;
  }

  // Determine if the current fiber is not a base component
  const isNotBaseComponent = !shouldProcessNode(currentFiber);
  const isHostRoot = currentFiber.tag === trackPassiveEffectMount;
  let didUpdate = false;
  const previousHasState = isHostRoot && previousFiber.memoizedState !== null;
  const currentHasState = isHostRoot && currentFiber.memoizedState !== null;

  // Both previous and current fibers have state: compare their children
  if (previousHasState && currentHasState) {
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    const previousChild = previousFiber.child;
    const previousChildSibling = previousChild ? previousChild.sibling : null;

    // If previous has no sibling but current does, traverse current'createInteractionAccessor sibling
    if (previousChildSibling == null && currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNotBaseComponent ? currentFiber : parentFiber, true, shouldTrackSideEffects);
      didUpdate = true;
    }
    // If both have siblings, recursively compare them
    if (
      currentChildSibling != null &&
      previousChildSibling != null &&
      updateFiberTreeRecursively(currentChildSibling, previousChildSibling, currentFiber, shouldTrackSideEffects)
    ) {
      didUpdate = true;
    }
  }
  // Previous has state, current does not: traverse current'createInteractionAccessor child
  else if (previousHasState && !currentHasState) {
    const currentChild = currentFiber.child;
    if (currentChild !== null) {
      traverseAndMountFiberTree(currentChild, isNotBaseComponent ? currentFiber : parentFiber, true, shouldTrackSideEffects);
    }
    didUpdate = true;
  }
  // Current has state, previous does not: clean up previous and traverse current'createInteractionAccessor child'createInteractionAccessor sibling
  else if (!previousHasState && currentHasState) {
    unmountFiberChildrenRecursively(previousFiber);
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    if (currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNotBaseComponent ? currentFiber : parentFiber, true, shouldTrackSideEffects);
      didUpdate = true;
    }
  }
  // Children have changed: traverse all children
  else if (currentFiber.child !== previousFiber.child) {
    let currentChild = currentFiber.child;
    let previousChild = previousFiber.child;
    while (currentChild) {
      if (currentChild.alternate) {
        const alternateChild = currentChild.alternate;
        if (
          updateFiberTreeRecursively(currentChild, alternateChild, isNotBaseComponent ? currentFiber : parentFiber, shouldTrackSideEffects)
        ) {
          didUpdate = true;
        }
        if (alternateChild !== previousChild) {
          didUpdate = true;
        }
      } else {
        traverseAndMountFiberTree(currentChild, isNotBaseComponent ? currentFiber : parentFiber, false, shouldTrackSideEffects);
        didUpdate = true;
      }
      currentChild = currentChild.sibling;
      if (!didUpdate && previousChild !== null) {
        previousChild = previousChild.sibling;
      }
    }
    if (previousChild !== null) {
      didUpdate = true;
    }
  }
  // If side effect tracking is enabled, collect all stateNodes for this subtree
  else if (P5) {
    if (shouldTrackSideEffects) {
      const subtreeFibers = collectTaggedNodesInTree(evaluateOrFallback(currentFiber));
      subtreeFibers.forEach(function (fiberNode) {
        d2.add(fiberNode.stateNode);
      });
    }
  }

  // If not a base component, update tree base duration if present
  if (isNotBaseComponent) {
    const hasTreeBaseDuration = currentFiber.hasOwnProperty("treeBaseDuration");
    if (hasTreeBaseDuration) {
      updateProfilerDurations(currentFiber);
    }
  }

  // If updates occurred, handle post-update logic
  if (didUpdate) {
    if (isNotBaseComponent) {
      let nextChild = currentFiber.child;
      if (currentHasState) {
        const child = currentFiber.child;
        nextChild = child ? child.sibling : null;
      }
      if (nextChild != null) {
        recordResetChildNodes(currentFiber, nextChild);
      }
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = updateFiberTreeRecursively;