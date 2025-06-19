/**
 * Processes an update for a Fiber node in the React reconciliation phase.
 *
 * This function determines the appropriate context, applies updates, manages flags and lanes,
 * and returns the child Fiber for further processing. It is a core part of the Fiber update loop.
 *
 * @param {Object|null} currentFiber - The current Fiber node (alternate), or null if mounting.
 * @param {Object} workInProgressFiber - The work-in-progress Fiber node being processed.
 * @param {number} renderLanes - The lanes (priority levels) for this render pass.
 * @param {boolean} hasTimeRemaining - Indicates if there is time remaining in the current render.
 * @param {number} currentLane - The current lane being processed.
 * @returns {Object|null} The child Fiber node to continue reconciliation, or null if none.
 */
function processFiberUpdate(currentFiber, workInProgressFiber, renderLanes, hasTimeRemaining, currentLane) {
  // Determine the context to use for this update
  const context = isContextProvider(renderLanes) ? defaultContext : handleInputCharacterCode.current;

  // Compute the resolved context for this Fiber
  const resolvedContext = computeResolvedContext(workInProgressFiber, context);

  // Perform any necessary side effects for this Fiber
  performSideEffects(workInProgressFiber, currentLane);

  // Begin work on this Fiber and get the next child
  const nextChildren = beginWorkOnFiber(currentFiber, workInProgressFiber, renderLanes, hasTimeRemaining, resolvedContext, currentLane);

  // Get the current render cycle status
  const renderCycleStatus = getRenderCycleStatus();

  // If this is an update (not mount) and not in a special bailout mode, finalize the update
  if (currentFiber !== null && !isBailoutMode) {
    workInProgressFiber.updateQueue = currentFiber.updateQueue;
    workInProgressFiber.flags &= ~0x805; // Remove specific flags (bitmask -2053)
    currentFiber.lanes &= ~currentLane;
    return finalizeFiberUpdate(currentFiber, workInProgressFiber, currentLane);
  }

  // If in legacy mode and render cycle is active, perform legacy update
  if (isLegacyMode && renderCycleStatus && shouldPerformLegacyUpdate(workInProgressFiber)) {
    // No return value needed here
  }

  // Mark this Fiber as having performed work
  workInProgressFiber.flags |= 1;

  // Complete the Fiber update and return the child
  completeFiberUpdate(currentFiber, workInProgressFiber, nextChildren, currentLane);
  return workInProgressFiber.child;
}

module.exports = processFiberUpdate;