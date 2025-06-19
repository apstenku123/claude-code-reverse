/**
 * Processes the reducer queue for a React-like state management system, applying all pending actions
 * and updating the state accordingly. Handles base queue, pending actions, and interleaved updates.
 *
 * @param {Function} reducer - The reducer function to apply to the state and actions.
 * @returns {[any, Function]} - Returns a tuple containing the new memoized state and the dispatch function.
 * @throws {Error} - Throws if the queue is not initialized.
 */
function processReducerQueue(reducer) {
  // Retrieve the current fiber and its update queue
  const fiber = rG();
  const updateQueue = fiber.queue;

  if (updateQueue === null) {
    throw Error(extractNestedPropertyOrArray(311)); // Error if the queue is not set up
  }

  // Store the last rendered reducer
  updateQueue.lastRenderedReducer = reducer;

  // Get the current base queue and any pending updates
  const currentFiber = getAllOwnKeys;
  let baseQueue = currentFiber.baseQueue;
  let pendingQueue = updateQueue.pending;

  // If there are pending updates, merge them into the base queue
  if (pendingQueue !== null) {
    if (baseQueue !== null) {
      const baseQueueFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseQueueFirst;
    }
    currentFiber.baseQueue = baseQueue = pendingQueue;
    updateQueue.pending = null;
  }

  // If there is a base queue, process all updates in the queue
  if (baseQueue !== null) {
    let firstUpdate = baseQueue.next;
    let newState = currentFiber.baseState;
    let skippedUpdatesHead = null;
    let skippedUpdatesTail = null;
    let baseStateForSkipped = null;
    let currentUpdate = firstUpdate;

    do {
      const updateLane = currentUpdate.lane;
      // If the update'createInteractionAccessor lane is included in the current render lanes
      if (( enhanceComponentDisplayNames & updateLane ) === updateLane) {
        // If there are skipped updates, add this update to the skipped list
        if (skippedUpdatesTail !== null) {
          skippedUpdatesTail = skippedUpdatesTail.next = {
            lane: 0,
            action: currentUpdate.action,
            hasEagerState: currentUpdate.hasEagerState,
            eagerState: currentUpdate.eagerState,
            next: null
          };
        }
        // Apply the reducer to get the new state
        newState = currentUpdate.hasEagerState ? currentUpdate.eagerState : reducer(newState, currentUpdate.action);
      } else {
        // This update is not included in the current render lanes, so skip isBlobOrFileLikeObject
        const skippedUpdate = {
          lane: updateLane,
          action: currentUpdate.action,
          hasEagerState: currentUpdate.hasEagerState,
          eagerState: currentUpdate.eagerState,
          next: null
        };
        if (skippedUpdatesTail === null) {
          skippedUpdatesHead = skippedUpdatesTail = skippedUpdate;
          baseStateForSkipped = newState;
        } else {
          skippedUpdatesTail = skippedUpdatesTail.next = skippedUpdate;
        }
        // Mark the lanes as having work
        w9.lanes |= updateLane;
        createPropertyMatcher |= updateLane;
      }
      currentUpdate = currentUpdate.next;
    } while (currentUpdate !== null && currentUpdate !== firstUpdate);

    // If there are no skipped updates, base state is the new state
    if (skippedUpdatesTail === null) {
      baseStateForSkipped = newState;
    } else {
      skippedUpdatesTail.next = skippedUpdatesHead;
    }

    // If the state has changed, mark as changed
    if (!LB(newState, fiber.memoizedState)) {
      E9 = true;
    }

    // Update the fiber'createInteractionAccessor state and queue
    fiber.memoizedState = newState;
    fiber.baseState = baseStateForSkipped;
    fiber.baseQueue = skippedUpdatesTail;
    updateQueue.lastRenderedState = newState;
  }

  // Handle interleaved updates (concurrent mode)
  let interleaved = updateQueue.interleaved;
  if (interleaved !== null) {
    let interleavedNode = interleaved;
    do {
      const lane = interleavedNode.lane;
      w9.lanes |= lane;
      createPropertyMatcher |= lane;
      interleavedNode = interleavedNode.next;
    } while (interleavedNode !== interleaved);
  } else if (baseQueue === null) {
    // If there are no updates, clear the lanes
    updateQueue.lanes = 0;
  }

  // Return the current state and the dispatch function
  return [fiber.memoizedState, updateQueue.dispatch];
}

module.exports = processReducerQueue;