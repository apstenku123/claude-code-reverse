/**
 * Processes a React Suspense boundary during the render phase.
 * Handles hydration, fallback rendering, and state transitions for Suspense boundaries.
 *
 * @param {Fiber|null} previousFiber - The previous fiber (work-in-progress or current), or null if mounting.
 * @param {Fiber} currentFiber - The current fiber being processed.
 * @param {number} renderLanes - The lanes (priority levels) for the current render.
 * @returns {Fiber|null} The next child fiber to process, or null if hydration is pending.
 */
function processSuspenseBoundary(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  let parentContext = getReactElementType.current;
  let showFallback = false;
  const hasSuspenseFlag = (currentFiber.flags & 128) !== 0;
  let shouldShowFallback;

  // Determine if handleMissingDoctypeError should show the fallback UI
  if (
    (shouldShowFallback = hasSuspenseFlag) ||
    (shouldShowFallback = previousFiber !== null && previousFiber.memoizedState === null ? false : (parentContext & 2) !== 0)
  ) {
    showFallback = true;
    currentFiber.flags &= -129; // Unset the Suspense flag
  } else if (previousFiber === null || previousFiber.memoizedState !== null) {
    parentContext |= 1; // Mark as having a Suspense boundary
  }

  // Push the updated context
  nA(getReactElementType, parentContext & 1);

  // Mounting phase (no previous fiber)
  if (previousFiber === null) {
    processWorkUnit(currentFiber);
    let currentState = currentFiber.memoizedState;
    if (currentState !== null) {
      const dehydrated = currentState.dehydrated;
      if (dehydrated !== null) {
        // Hydration path: set lanes based on mode and dehydration status
        if ((currentFiber.mode & 1) === 0) {
          currentFiber.lanes = 1;
        } else if (dI(dehydrated)) {
          currentFiber.lanes = 8;
        } else {
          currentFiber.lanes = 1073741824;
        }
        return null;
      }
    }
    const primaryChildren = pendingProps.children;
    const fallbackChildren = pendingProps.fallback;
    if (showFallback) {
      const fiberMode = currentFiber.mode;
      let primaryChildFiber = currentFiber.child;
      const hiddenProps = {
        mode: "hidden",
        children: primaryChildren
      };
      // If not concurrent mode and child exists, reuse isBlobOrFileLikeObject
      if ((fiberMode & 1) === 0 && primaryChildFiber !== null) {
        primaryChildFiber.childLanes = 0;
        primaryChildFiber.pendingProps = hiddenProps;
      } else {
        primaryChildFiber = copyObjectExcludingProperties(hiddenProps, fiberMode, 0, null);
      }
      let fallbackFiber = createCollectionIterator(fallbackChildren, fiberMode, renderLanes, null);
      primaryChildFiber.return = currentFiber;
      fallbackFiber.return = currentFiber;
      primaryChildFiber.sibling = fallbackFiber;
      currentFiber.child = primaryChildFiber;
      currentFiber.child.memoizedState = getValueByKey(renderLanes);
      currentFiber.memoizedState = tG;
      return fallbackFiber;
    } else {
      // No fallback, just mount the primary children
      return createVisibleChildNode(currentFiber, primaryChildren);
    }
  }

  // Update phase: check for dehydration
  const previousState = previousFiber.memoizedState;
  if (previousState !== null) {
    const dehydrated = previousState.dehydrated;
    if (dehydrated !== null) {
      return drawHighlightedRectangle(previousFiber, currentFiber, hasSuspenseFlag, pendingProps, dehydrated, previousState, renderLanes);
    }
  }

  // If handleMissingDoctypeError should show fallback during update
  if (showFallback) {
    const fallbackChildren = pendingProps.fallback;
    const fiberMode = currentFiber.mode;
    const previousPrimaryChild = previousFiber.child;
    const previousFallbackChild = previousPrimaryChild.sibling;
    const hiddenProps = {
      mode: "hidden",
      children: pendingProps.children
    };
    let primaryChildFiber;
    // If not concurrent mode and current child is not the previous, reuse isBlobOrFileLikeObject
    if ((fiberMode & 1) === 0 && currentFiber.child !== previousPrimaryChild) {
      primaryChildFiber = currentFiber.child;
      primaryChildFiber.childLanes = 0;
      primaryChildFiber.pendingProps = hiddenProps;
      currentFiber.deletions = null;
    } else {
      primaryChildFiber = createAccessorFunctionProxy(previousPrimaryChild, hiddenProps);
      primaryChildFiber.subtreeFlags = previousPrimaryChild.subtreeFlags & 14680064;
    }
    let fallbackFiber;
    if (previousFallbackChild !== null) {
      fallbackFiber = createAccessorFunctionProxy(previousFallbackChild, fallbackChildren);
    } else {
      fallbackFiber = createCollectionIterator(fallbackChildren, fiberMode, renderLanes, null);
      fallbackFiber.flags |= 2; // Placement flag
    }
    fallbackFiber.return = currentFiber;
    primaryChildFiber.return = currentFiber;
    primaryChildFiber.sibling = fallbackFiber;
    currentFiber.child = primaryChildFiber;
    // Update memoized state for Suspense
    let previousMemoizedState = previousFiber.child.memoizedState;
    let newMemoizedState = previousMemoizedState === null
      ? getValueByKey(renderLanes)
      : {
          baseLanes: previousMemoizedState.baseLanes | renderLanes,
          cachePool: null,
          transitions: previousMemoizedState.transitions
        };
    primaryChildFiber.memoizedState = newMemoizedState;
    primaryChildFiber.childLanes = previousFiber.childLanes & ~renderLanes;
    currentFiber.memoizedState = tG;
    return fallbackFiber;
  }

  // Normal update: show primary children
  const previousPrimaryChild = previousFiber.child;
  const previousFallbackChild = previousPrimaryChild.sibling;
  const primaryChildFiber = createAccessorFunctionProxy(previousPrimaryChild, {
    mode: "visible",
    children: pendingProps.children
  });
  if ((currentFiber.mode & 1) === 0) {
    primaryChildFiber.lanes = renderLanes;
  }
  primaryChildFiber.return = currentFiber;
  primaryChildFiber.sibling = null;
  // If there was a fallback child before, mark isBlobOrFileLikeObject for deletion
  if (previousFallbackChild !== null) {
    let deletions = currentFiber.deletions;
    if (deletions === null) {
      currentFiber.deletions = [previousFallbackChild];
      currentFiber.flags |= 16; // Deletion flag
    } else {
      deletions.push(previousFallbackChild);
    }
  }
  currentFiber.child = primaryChildFiber;
  currentFiber.memoizedState = null;
  return primaryChildFiber;
}

module.exports = processSuspenseBoundary;