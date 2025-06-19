/**
 * Handles the creation and processing of an action object for a given lane.
 * If the lane is currently being processed (as determined by isNodeOrAlternateNodeMatch),
 * the action is queued via enqueuePendingNode. Otherwise, isBlobOrFileLikeObject is processed immediately
 * using enqueueInterleavedNode, sliceArrayLike, and updateLanesIfFlagged.
 *
 * @param {Object} laneOwner - The object representing the lane owner (e.g., a fiber or queue owner).
 * @param {Function} dispatchFunction - The function to dispatch the action.
 * @param {any} action - The action to be processed or queued.
 * @returns {void}
 */
function enqueueOrProcessAction(laneOwner, dispatchFunction, action) {
  // Determine the lane for the given owner
  const lane = getEffectiveModeValue(laneOwner);

  // Create the action object with initial state
  let actionObject = {
    lane: lane,
    action: action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };

  // If the lane is currently being processed, queue the action
  if (isNodeOrAlternateNodeMatch(laneOwner)) {
    enqueuePendingNode(dispatchFunction, actionObject);
  } else {
    // Otherwise, attempt to process the action immediately
    actionObject = enqueueInterleavedNode(laneOwner, dispatchFunction, actionObject, lane);
    if (actionObject !== null) {
      // Get the current timestamp or context
      const currentContext = getOrComputeValue();
      // Process the action
      sliceArrayLike(actionObject, laneOwner, lane, currentContext);
      // Finalize the action processing
      updateLanesIfFlagged(actionObject, dispatchFunction, lane);
    }
  }
}

module.exports = enqueueOrProcessAction;