/**
 * Processes a Suspense component during the React reconciliation phase.
 * Handles hydration, fallback rendering, and updating of child components based on the current render state.
 *
 * @param {object|null} previousFiber - The previous fiber (work-in-progress) for this Suspense component, or null if mounting.
 * @param {object} currentFiber - The current fiber node representing the Suspense component being processed.
 * @param {number} renderLanes - The lanes (priority levels) for the current render pass.
 * @returns {object|null} The next child fiber to process, or null if hydration is in progress.
 */
function processSuspenseComponent(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  let currentContext = getReactElementType.current;
  let showFallback = false;
  const hasSuspended = (currentFiber.flags & 128) !== 0;
  let shouldShowFallback;

  // Determine if handleMissingDoctypeError should show the fallback UI
  if (
    (shouldShowFallback = hasSuspended) ||
    (shouldShowFallback = previousFiber !== null && previousFiber.memoizedState === null ? false : (currentContext & 2) !== 0)
  ) {
    showFallback = true;
    currentFiber.flags &= ~128; // Remove the Suspense flag
  } else if (previousFiber === null || previousFiber.memoizedState !== null) {
    currentContext |= 1; // Mark that handleMissingDoctypeError are in a Suspense boundary
  }

  // Push the updated context
  nA(getReactElementType, currentContext & 1);

  // Mount phase: previousFiber is null
  if (previousFiber === null) {
    // Prepare for hydration if needed
    processWorkUnit(currentFiber);
    let currentMemoizedState = currentFiber.memoizedState;
    if (currentMemoizedState !== null) {
      const dehydratedNode = currentMemoizedState.dehydrated;
      if (dehydratedNode !== null) {
        // If not strict mode, set lanes to 1 (SyncLane)
        // Else, set lanes based on hydration status
        if ((currentFiber.mode & 1) === 0) {
          currentFiber.lanes = 1;
        } else if (dI(dehydratedNode)) {
          currentFiber.lanes = 8;
        } else {
          currentFiber.lanes = 1073741824;
        }
        return null;
      }
    }
    // Not hydrating: create children and fallback
    const primaryChildren = pendingProps.children;
    const fallbackChildren = pendingProps.fallback;
    if (showFallback) {
      const fiberMode = currentFiber.mode;
      let primaryChildFiber = currentFiber.child;
      const hiddenProps = {
        mode: "hidden",
        children: primaryChildren
      };
      // If not strict mode and handleMissingDoctypeError have a child, reuse isBlobOrFileLikeObject
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
      // No fallback: render primary children
      return createVisibleChildNode(currentFiber, primaryChildren);
    }
  }

  // Update phase: previousFiber is not null
  const previousMemoizedState = previousFiber.memoizedState;
  if (previousMemoizedState !== null) {
    const dehydratedNode = previousMemoizedState.dehydrated;
    if (dehydratedNode !== null) {
      // Handle hydration update
      return drawHighlightedRectangle(
        previousFiber,
        currentFiber,
        hasSuspended,
        pendingProps,
        dehydratedNode,
        previousMemoizedState,
        renderLanes
      );
    }
  }

  // If handleMissingDoctypeError need to show fallback (suspending)
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
    // If not strict mode and current child is not the previous primary, reuse isBlobOrFileLikeObject
    if ((fiberMode & 1) === 0 && currentFiber.child !== previousPrimaryChild) {
      primaryChildFiber = currentFiber.child;
      primaryChildFiber.childLanes = 0;
      primaryChildFiber.pendingProps = hiddenProps;
      currentFiber.deletions = null;
    } else {
      primaryChildFiber = createAccessorFunctionProxy(previousPrimaryChild, hiddenProps);
      primaryChildFiber.subtreeFlags = previousPrimaryChild.subtreeFlags & 14680064;
    }
    let fallbackChildFiber;
    if (previousFallbackChild !== null) {
      fallbackChildFiber = createAccessorFunctionProxy(previousFallbackChild, fallbackChildren);
    } else {
      fallbackChildFiber = createCollectionIterator(fallbackChildren, fiberMode, renderLanes, null);
      fallbackChildFiber.flags |= 2; // Placement flag
    }
    fallbackChildFiber.return = currentFiber;
    primaryChildFiber.return = currentFiber;
    primaryChildFiber.sibling = fallbackChildFiber;
    currentFiber.child = primaryChildFiber;
    // Update memoizedState for the primary child
    const previousPrimaryMemoizedState = previousFiber.child.memoizedState;
    let newMemoizedState;
    if (previousPrimaryMemoizedState === null) {
      newMemoizedState = getValueByKey(renderLanes);
    } else {
      newMemoizedState = {
        baseLanes: previousPrimaryMemoizedState.baseLanes | renderLanes,
        cachePool: null,
        transitions: previousPrimaryMemoizedState.transitions
      };
    }
    primaryChildFiber.memoizedState = newMemoizedState;
    primaryChildFiber.childLanes = previousFiber.childLanes & ~renderLanes;
    currentFiber.memoizedState = tG;
    return fallbackChildFiber;
  }

  // No fallback: update primary children
  const previousPrimaryChild = previousFiber.child;
  const previousFallbackChild = previousPrimaryChild.sibling;
  const visibleProps = {
    mode: "visible",
    children: pendingProps.children
  };
  let primaryChildFiber = createAccessorFunctionProxy(previousPrimaryChild, visibleProps);
  if ((currentFiber.mode & 1) === 0) {
    primaryChildFiber.lanes = renderLanes;
  }
  primaryChildFiber.return = currentFiber;
  primaryChildFiber.sibling = null;
  if (previousFallbackChild !== null) {
    let deletions = currentFiber.deletions;
    if (deletions === null) {
      currentFiber.deletions = [previousFallbackChild];
      currentFiber.flags |= 16; // ChildDeletion flag
    } else {
      deletions.push(previousFallbackChild);
    }
  }
  currentFiber.child = primaryChildFiber;
  currentFiber.memoizedState = null;
  return primaryChildFiber;
}

module.exports = processSuspenseComponent;