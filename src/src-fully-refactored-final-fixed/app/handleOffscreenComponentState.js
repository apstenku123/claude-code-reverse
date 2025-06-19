/**
 * Handles the state transitions for an offscreen (hidden) React component during rendering.
 * This function manages memoized state, lanes, and transitions based on the component'createInteractionAccessor mode and update lanes.
 *
 * @param {Object} previousFiber - The previous fiber node (can be null on initial mount).
 * @param {Object} currentFiber - The current fiber node being processed.
 * @param {number} renderLanes - The lanes (priority levels) for the current render pass.
 * @returns {Object|null} The first child fiber of the current fiber, or null if rendering is suspended.
 */
function handleOffscreenComponentState(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  const children = pendingProps.children;
  const previousMemoizedState = previousFiber !== null ? previousFiber.memoizedState : null;

  // Check if the component is in 'hidden' mode
  if (pendingProps.mode === "hidden") {
    // If the Offscreen component is not currently showing (mode bitmask check)
    if ((currentFiber.mode & 1) === 0) {
      // Set memoized state to indicate hidden with no transitions or cache
      currentFiber.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      nA(KJ, extractSourcesAndResolvedStyles); // External side-effect (details depend on implementation)
      extractSourcesAndResolvedStyles |= renderLanes;
    } else {
      // If the component is hidden but not rendering at the highest priority
      if ((renderLanes & 1073741824) === 0) {
        // Calculate the new base lanes
        const newBaseLanes = previousMemoizedState !== null ? previousMemoizedState.baseLanes | renderLanes : renderLanes;
        // Mark the fiber as suspended (highest priority lane)
        currentFiber.lanes = currentFiber.childLanes = 1073741824;
        currentFiber.memoizedState = {
          baseLanes: newBaseLanes,
          cachePool: null,
          transitions: null
        };
        currentFiber.updateQueue = null;
        nA(KJ, extractSourcesAndResolvedStyles);
        extractSourcesAndResolvedStyles |= newBaseLanes;
        // Return null to indicate suspension
        return null;
      }
      // If rendering at the highest priority, clear memoized state
      currentFiber.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      const baseLanesToMark = previousMemoizedState !== null ? previousMemoizedState.baseLanes : renderLanes;
      nA(KJ, extractSourcesAndResolvedStyles);
      extractSourcesAndResolvedStyles |= baseLanesToMark;
    }
  } else {
    // If not hidden, clear memoized state and merge lanes
    let mergedLanes;
    if (previousMemoizedState !== null) {
      mergedLanes = previousMemoizedState.baseLanes | renderLanes;
      currentFiber.memoizedState = null;
    } else {
      mergedLanes = renderLanes;
    }
    nA(KJ, extractSourcesAndResolvedStyles);
    extractSourcesAndResolvedStyles |= mergedLanes;
  }

  // Continue rendering the children
  updateChildNode(previousFiber, currentFiber, children, renderLanes);
  return currentFiber.child;
}

module.exports = handleOffscreenComponentState;