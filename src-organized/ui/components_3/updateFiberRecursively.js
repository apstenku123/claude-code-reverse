/**
 * Recursively updates a fiber tree, handling state synchronization, child reconciliation, and side effects.
 * This function is typically used in a React-like reconciliation process to walk and update the fiber tree structure.
 *
 * @param {Object} currentFiber - The current fiber node being processed.
 * @param {Object} previousFiber - The previous (alternate) fiber node for comparison.
 * @param {Object} parentFiber - The parent fiber node.
 * @param {boolean} isSpecialUpdate - Indicates if a special update path should be taken (e.g., for suspense or error boundaries).
 * @returns {boolean} - Returns true if the update should bubble up, false otherwise.
 */
function updateFiberRecursively(currentFiber, previousFiber, parentFiber, isSpecialUpdate) {
  const currentFiberId = NH(currentFiber);

  // Debug logging if enabled
  if (sendHttpRequestOverSocket) {
    N2("updateFiberRecursively()", currentFiber, parentFiber);
  }

  // Handle special update logic if enabled
  if (P5) {
    const currentFiberType = getProcessingHandlerByTagOrType(currentFiber);
    if (isSpecialUpdate) {
      // If the fiber is of a specific type, mark its stateNode for special handling
      if (currentFiberType === saveAndSwapContext) {
        d2.add(currentFiber.stateNode);
        isSpecialUpdate = false;
      }
    } else if (
      currentFiberType === processHtmlElement ||
      currentFiberType === d6 ||
      currentFiberType === handleDomNodeInsertion ||
      currentFiberType === updateBitwiseStateAndEncode ||
      currentFiberType === handleElementProcessing
    ) {
      // For certain fiber types, determine if special update is needed
      isSpecialUpdate = havePropsOrStateChanged(previousFiber, currentFiber);
    }
  }

  // If a global object matches this fiber and special update is needed, set a global flag
  if (GG !== null && GG.id === currentFiberId && havePropsOrStateChanged(previousFiber, currentFiber)) {
    Cq = true;
  }

  // Determine if this fiber is not a special type (e.g., not a Suspense or Profiler)
  const isNormalFiber = !shouldProcessNode(currentFiber);
  // Check if this fiber is of a specific tag (e.g., FunctionComponent)
  const isFunctionComponent = currentFiber.tag === trackPassiveEffectMount;
  let didUpdate = false;
  // Does previous fiber have memoized state?
  const prevHasState = isFunctionComponent && previousFiber.memoizedState !== null;
  // Does current fiber have memoized state?
  const currHasState = isFunctionComponent && currentFiber.memoizedState !== null;

  // Case 1: Both previous and current fibers have state
  if (prevHasState && currHasState) {
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    const previousChild = previousFiber.child;
    const previousChildSibling = previousChild ? previousChild.sibling : null;

    // If previous child has no sibling but current child does, update isBlobOrFileLikeObject
    if (previousChildSibling == null && currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNormalFiber ? currentFiber : parentFiber, true, isSpecialUpdate);
      didUpdate = true;
    }
    // If both have siblings, recursively update them
    if (
      currentChildSibling != null &&
      previousChildSibling != null &&
      updateFiberRecursively(currentChildSibling, previousChildSibling, currentFiber, isSpecialUpdate)
    ) {
      didUpdate = true;
    }
  }
  // Case 2: Previous fiber has state, current does not
  else if (prevHasState && !currHasState) {
    const currentChild = currentFiber.child;
    if (currentChild !== null) {
      traverseAndMountFiberTree(currentChild, isNormalFiber ? currentFiber : parentFiber, true, isSpecialUpdate);
    }
    didUpdate = true;
  }
  // Case 3: Current fiber has state, previous does not
  else if (!prevHasState && currHasState) {
    unmountFiberChildrenRecursively(previousFiber);
    const currentChild = currentFiber.child;
    const currentChildSibling = currentChild ? currentChild.sibling : null;
    if (currentChildSibling != null) {
      traverseAndMountFiberTree(currentChildSibling, isNormalFiber ? currentFiber : parentFiber, true, isSpecialUpdate);
      didUpdate = true;
    }
  }
  // Case 4: Children have changed, reconcile all children
  else if (currentFiber.child !== previousFiber.child) {
    let currentChild = currentFiber.child;
    let previousChild = previousFiber.child;
    while (currentChild) {
      if (currentChild.alternate) {
        const alternateChild = currentChild.alternate;
        if (updateFiberRecursively(currentChild, alternateChild, isNormalFiber ? currentFiber : parentFiber, isSpecialUpdate)) {
          didUpdate = true;
        }
        if (alternateChild !== previousChild) {
          didUpdate = true;
        }
      } else {
        traverseAndMountFiberTree(currentChild, isNormalFiber ? currentFiber : parentFiber, false, isSpecialUpdate);
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
  // Case 5: Special update logic for certain fiber types
  else if (P5) {
    if (isSpecialUpdate) {
      const specialNodes = collectTaggedNodesInTree(evaluateOrFallback(currentFiber));
      specialNodes.forEach(function (specialFiber) {
        d2.add(specialFiber.stateNode);
      });
    }
  }

  // If this is a normal fiber, handle tree base duration bookkeeping
  if (isNormalFiber) {
    const hasTreeBaseDuration = currentFiber.hasOwnProperty("treeBaseDuration");
    if (hasTreeBaseDuration) {
      updateProfilerDurations(currentFiber);
    }
  }

  // If any update occurred, handle side effects and return
  if (didUpdate) {
    if (isNormalFiber) {
      let nextChild = currentFiber.child;
      if (currHasState) {
        const firstChild = currentFiber.child;
        nextChild = firstChild ? firstChild.sibling : null;
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

module.exports = updateFiberRecursively;