/**
 * Enqueues a reducer action for a given fiber node, handling eager state updates and interleaved queues.
 *
 * @param {Object} fiberNode - The fiber node to update.
 * @param {Object} queue - The update queue associated with the fiber node.
 * @param {any} action - The action to dispatch to the reducer.
 * @returns {void}
 */
function enqueueReducerAction(fiberNode, queue, action) {
  // Compute the lane for this update
  const lane = getEffectiveModeValue(fiberNode);

  // Create a new update object
  let update = {
    lane: lane,
    action: action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };

  // If the fiber is currently rendering, use the concurrent queue
  if (isNodeOrAlternateNodeMatch(fiberNode)) {
    enqueuePendingNode(queue, update);
    return;
  }

  // Attempt eager state computation if possible
  const alternateFiber = fiberNode.alternate;
  const noPendingLanes = fiberNode.lanes === 0 && (alternateFiber === null || alternateFiber.lanes === 0);
  const lastRenderedReducer = queue.lastRenderedReducer;

  if (noPendingLanes && lastRenderedReducer !== null) {
    try {
      const previousState = queue.lastRenderedState;
      const eagerState = lastRenderedReducer(previousState, action);
      update.hasEagerState = true;
      update.eagerState = eagerState;

      // If the eager state is equal to the previous state, skip scheduling
      if (LB(eagerState, previousState)) {
        let interleaved = queue.interleaved;
        if (interleaved === null) {
          update.next = update;
          addValueToGlobalArray(queue);
        } else {
          update.next = interleaved.next;
          interleaved.next = update;
        }
        queue.interleaved = update;
        return;
      }
    } catch (error) {
      // Ignore errors during eager computation
    } finally {
      // No cleanup required
    }
  }

  // Fallback: schedule a normal update
  let dispatchedUpdate = enqueueInterleavedNode(fiberNode, queue, update, lane);
  if (dispatchedUpdate !== null) {
    update = getOrComputeValue();
    sliceArrayLike(dispatchedUpdate, fiberNode, lane, update);
    updateLanesIfFlagged(dispatchedUpdate, queue, lane);
  }
}

module.exports = enqueueReducerAction;