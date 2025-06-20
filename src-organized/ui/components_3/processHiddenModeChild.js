/**
 * Processes a Fiber node in the context of React'createInteractionAccessor 'hidden' mode, managing memoized state, lanes, and transitions.
 *
 * @param {Object|null} previousFiber - The previous Fiber node, or null if this is the first render.
 * @param {Object} currentFiber - The current Fiber node being processed.
 * @param {number} renderLanes - The lanes (priority levels) for the current render pass.
 * @returns {Object|null} The first child Fiber node, or null if rendering is deferred.
 */
function processHiddenModeChild(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  const children = pendingProps.children;
  const previousMemoizedState = previousFiber !== null ? previousFiber.memoizedState : null;

  // Check if the current Fiber is in 'hidden' mode
  if (pendingProps.mode === "hidden") {
    // If the Fiber is not currently hidden (mode bit 1 not set)
    if ((currentFiber.mode & 1) === 0) {
      // Mark as hidden and reset memoized state
      currentFiber.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      nA(KJ, extractSourcesAndResolvedStyles); // External side effect (likely scheduling or context update)
      extractSourcesAndResolvedStyles |= renderLanes;
    } else {
      // If the renderLanes do not include the 'offscreen' bit (1073741824)
      if ((renderLanes & 1073741824) === 0) {
        // Defer rendering: set lanes to 'offscreen', update memoized state, and return null
        const baseLanes = previousMemoizedState !== null ? previousMemoizedState.baseLanes | renderLanes : renderLanes;
        currentFiber.lanes = currentFiber.childLanes = 1073741824;
        currentFiber.memoizedState = {
          baseLanes,
          cachePool: null,
          transitions: null
        };
        currentFiber.updateQueue = null;
        nA(KJ, extractSourcesAndResolvedStyles);
        extractSourcesAndResolvedStyles |= baseLanes;
        return null;
      }
      // If 'offscreen' bit is set, reset memoized state
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
    // Not in 'hidden' mode: clear memoized state if isBlobOrFileLikeObject exists, and update baseLanes
    let baseLanes;
    if (previousMemoizedState !== null) {
      baseLanes = previousMemoizedState.baseLanes | renderLanes;
      currentFiber.memoizedState = null;
    } else {
      baseLanes = renderLanes;
    }
    nA(KJ, extractSourcesAndResolvedStyles);
    extractSourcesAndResolvedStyles |= baseLanes;
  }

  // Continue processing children
  updateChildNode(previousFiber, currentFiber, children, renderLanes);
  return currentFiber.child;
}

module.exports = processHiddenModeChild;