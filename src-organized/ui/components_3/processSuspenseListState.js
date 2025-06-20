/**
 * Processes the SuspenseList state for a React Fiber node, handling hidden mode and transitions.
 *
 * @param {Object|null} previousFiber - The previous Fiber node, or null if this is the first render.
 * @param {Object} currentFiber - The current Fiber node being processed.
 * @param {number} renderLanes - The lanes (priority levels) for this render pass.
 * @returns {Object|null} - Returns the first child Fiber node or null if rendering is suspended.
 */
function processSuspenseListState(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  const children = pendingProps.children;
  // Retrieve the previous memoized state, if any
  const previousMemoizedState = previousFiber !== null ? previousFiber.memoizedState : null;

  // Check if the SuspenseList is in 'hidden' mode
  if (pendingProps.mode === "hidden") {
    // If the current fiber is not already in hidden mode
    if ((currentFiber.mode & 1) === 0) {
      // Set memoized state to indicate hidden mode with no lanes or transitions
      currentFiber.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      // Update global state for hidden mode (side effect)
      nA(KJ, extractSourcesAndResolvedStyles);
      extractSourcesAndResolvedStyles |= renderLanes;
    } else {
      // If not rendering at the highest priority (suspend), return early
      if ((renderLanes & 1073741824) === 0) {
        // Calculate new base lanes
        const newBaseLanes = previousMemoizedState !== null ? previousMemoizedState.baseLanes | renderLanes : renderLanes;
        // Set lanes to indicate suspension
        currentFiber.lanes = currentFiber.childLanes = 1073741824;
        currentFiber.memoizedState = {
          baseLanes: newBaseLanes,
          cachePool: null,
          transitions: null
        };
        currentFiber.updateQueue = null;
        // Update global state for suspension (side effect)
        nA(KJ, extractSourcesAndResolvedStyles);
        extractSourcesAndResolvedStyles |= newBaseLanes;
        return null;
      }
      // If rendering at the highest priority, reset memoized state
      currentFiber.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      const baseLanes = previousMemoizedState !== null ? previousMemoizedState.baseLanes : renderLanes;
      nA(KJ, extractSourcesAndResolvedStyles);
      extractSourcesAndResolvedStyles |= baseLanes;
    }
  } else {
    // Not in hidden mode
    if (previousMemoizedState !== null) {
      // Merge previous base lanes with current render lanes
      const mergedLanes = previousMemoizedState.baseLanes | renderLanes;
      currentFiber.memoizedState = null;
      nA(KJ, extractSourcesAndResolvedStyles);
      extractSourcesAndResolvedStyles |= mergedLanes;
    } else {
      nA(KJ, extractSourcesAndResolvedStyles);
      extractSourcesAndResolvedStyles |= renderLanes;
    }
  }
  // Continue rendering children
  updateChildNode(previousFiber, currentFiber, children, renderLanes);
  return currentFiber.child;
}

module.exports = processSuspenseListState;