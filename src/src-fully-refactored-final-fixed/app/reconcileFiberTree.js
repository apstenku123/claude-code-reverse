/**
 * Reconciles two fiber trees, updating state and tracking changes for efficient UI updates.
 * Handles various fiber node types and manages side effects such as marking nodes for update or scheduling work.
 *
 * @param {Object} currentFiber - The current fiber node in the tree.
 * @param {Object} previousFiber - The previous (alternate) fiber node.
 * @param {Object} parentFiber - The parent fiber node, used for context in recursive calls.
 * @param {boolean} isForceUpdate - Indicates whether a force update is required for this subtree.
 * @returns {boolean} - Returns true if the subtree needs to be updated, false otherwise.
 */
function reconcileFiberTree(currentFiber, previousFiber, parentFiber, isForceUpdate) {
  const currentFiberId = NH(currentFiber);
  // Debug: Log update if global sendHttpRequestOverSocket flag is set
  if (sendHttpRequestOverSocket) {
    N2("updateFiberRecursively()", currentFiber, parentFiber);
  }

  // Track if this is a special update scenario
  if (P5) {
    const currentFiberType = getProcessingHandlerByTagOrType(currentFiber);
    if (isForceUpdate) {
      // If the fiber is of a specific type, mark its stateNode for update
      if (currentFiberType === saveAndSwapContext) {
        d2.add(currentFiber.stateNode);
        isForceUpdate = false;
      }
    } else if (
      currentFiberType === processHtmlElement ||
      currentFiberType === d6 ||
      currentFiberType === handleDomNodeInsertion ||
      currentFiberType === updateBitwiseStateAndEncode ||
      currentFiberType === handleElementProcessing
    ) {
      // For certain types, determine if force update is needed
      isForceUpdate = havePropsOrStateChanged(previousFiber, currentFiber);
    }
  }

  // If a global update is in progress for this fiber, mark the change
  if (
    GG !== null &&
    GG.id === currentFiberId &&
    havePropsOrStateChanged(previousFiber, currentFiber)
  ) {
    Cq = true;
  }

  // Determine if this fiber is not a base component
  const isNotBaseComponent = !shouldProcessNode(currentFiber);
  // Check if this is a special fiber type (e.g., Suspense)
  const isSpecialFiberType = currentFiber.tag === trackPassiveEffectMount;
  let subtreeNeedsUpdate = false;
  // Check if previous and current fibers have memoized state (e.g., Suspense boundaries)
  const previousHasState = isSpecialFiberType && previousFiber.memoizedState !== null;
  const currentHasState = isSpecialFiberType && currentFiber.memoizedState !== null;

  // Handle Suspense-like boundaries with state transitions
  if (previousHasState && currentHasState) {
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    const previousChild = previousFiber.child;
    const previousChildSibling = previousChild ? previousChild.sibling : null;

    // If previous had no sibling but current does, update recursively
    if (previousChildSibling == null && currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNotBaseComponent ? currentFiber : parentFiber, true, isForceUpdate);
      subtreeNeedsUpdate = true;
    }
    // If both have siblings, recursively reconcile them
    if (
      currentChildSibling != null &&
      previousChildSibling != null &&
      reconcileFiberTree(currentChildSibling, previousChildSibling, currentFiber, isForceUpdate)
    ) {
      subtreeNeedsUpdate = true;
    }
  } else if (previousHasState && !currentHasState) {
    // If previous had state but current does not, update the current child
    const currentChild = currentFiber.child;
    if (currentChild !== null) {
      traverseAndMountFiberTree(currentChild, isNotBaseComponent ? currentFiber : parentFiber, true, isForceUpdate);
    }
    subtreeNeedsUpdate = true;
  } else if (!previousHasState && currentHasState) {
    // If current has state but previous did not, schedule work on previous fiber
    unmountFiberChildrenRecursively(previousFiber);
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    if (currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNotBaseComponent ? currentFiber : parentFiber, true, isForceUpdate);
      subtreeNeedsUpdate = true;
    }
  } else if (currentFiber.child !== previousFiber.child) {
    // If the child structure changed, reconcile all children
    let currentChild = currentFiber.child;
    let previousChild = previousFiber.child;
    while (currentChild) {
      if (currentChild.alternate) {
        const alternateChild = currentChild.alternate;
        if (
          reconcileFiberTree(currentChild, alternateChild, isNotBaseComponent ? currentFiber : parentFiber, isForceUpdate)
        ) {
          subtreeNeedsUpdate = true;
        }
        if (alternateChild !== previousChild) {
          subtreeNeedsUpdate = true;
        }
      } else {
        traverseAndMountFiberTree(currentChild, isNotBaseComponent ? currentFiber : parentFiber, false, isForceUpdate);
        subtreeNeedsUpdate = true;
      }
      // Advance to next sibling
      currentChild = currentChild.sibling;
      if (!subtreeNeedsUpdate && previousChild !== null) {
        previousChild = previousChild.sibling;
      }
    }
    if (previousChild !== null) {
      subtreeNeedsUpdate = true;
    }
  } else if (P5) {
    // If in special update mode and force update is set, mark all descendants
    if (isForceUpdate) {
      const descendantFibers = collectTaggedNodesInTree(evaluateOrFallback(currentFiber));
      descendantFibers.forEach(function (descendantFiber) {
        d2.add(descendantFiber.stateNode);
      });
    }
  }

  // If this is not a base component, update duration tracking
  if (isNotBaseComponent) {
    const hasTreeBaseDuration = currentFiber.hasOwnProperty("treeBaseDuration");
    if (hasTreeBaseDuration) {
      updateProfilerDurations(currentFiber);
    }
  }

  // If any subtree needs update, handle accordingly
  if (subtreeNeedsUpdate) {
    if (isNotBaseComponent) {
      // For non-base components, update siblings as needed
      let nextSibling = currentFiber.child;
      if (currentHasState) {
        const child = currentFiber.child;
        nextSibling = child ? child.sibling : null;
      }
      if (nextSibling != null) {
        recordResetChildNodes(currentFiber, nextSibling);
      }
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = reconcileFiberTree;