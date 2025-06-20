/**
 * Processes the update queue for a given fiber node, applying updates based on the current render lanes.
 * Handles merging of pending updates, processes each update according to its tag, and manages base state and effects.
 *
 * @param {object} fiber - The fiber node whose update queue is being processed.
 * @param {number} renderLanes - The lanes being rendered in this pass.
 * @param {any} context - The context to be passed to update payload functions.
 * @param {number} currentLanes - The current set of lanes being processed.
 * @returns {void}
 */
function processUpdateQueue(fiber, renderLanes, context, currentLanes) {
  const updateQueue = fiber.updateQueue;
  getPropertyOrDefault = false; // Reset global flag (purpose unknown from context)

  // Destructure base updates from the update queue
  let {
    firstBaseUpdate,
    lastBaseUpdate
  } = updateQueue;

  let pendingUpdates = updateQueue.shared.pending;

  // If there are pending updates, merge them into the base update list
  if (pendingUpdates !== null) {
    updateQueue.shared.pending = null;
    const lastPendingUpdate = pendingUpdates;
    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;

    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }
    lastBaseUpdate = lastPendingUpdate;

    // Also merge into the alternate fiber'createInteractionAccessor update queue if isBlobOrFileLikeObject exists
    let alternate = fiber.alternate;
    if (alternate !== null) {
      const alternateQueue = alternate.updateQueue;
      let alternateLastBaseUpdate = alternateQueue.lastBaseUpdate;
      if (alternateLastBaseUpdate !== lastPendingUpdate) {
        if (alternateLastBaseUpdate === null) {
          alternateQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          alternateLastBaseUpdate.next = firstPendingUpdate;
        }
        alternateQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  }

  // If there are base updates to process
  if (firstBaseUpdate !== null) {
    let newBaseState = updateQueue.baseState;
    let newLanes = 0;
    let newFirstBaseUpdate = null;
    let newLastBaseUpdate = null;
    let baseStateForSkippedUpdates = null;
    let update = firstBaseUpdate;

    do {
      const {
        lane: updateLane,
        eventTime,
        tag,
        payload,
        callback
      } = update;

      if ((currentLanes & updateLane) === updateLane) {
        // This update should be processed in this render
        if (newLastBaseUpdate !== null) {
          // Clone and add to the new base update list as a skipped update
          newLastBaseUpdate = newLastBaseUpdate.next = {
            eventTime,
            lane: 0,
            tag,
            payload,
            callback,
            next: null
          };
        }
        // Process the update based on its tag
        switch (tag) {
          case 1: // Replace state
            if (typeof payload === "function") {
              newBaseState = payload.call(context, newBaseState, renderLanes);
            } else {
              newBaseState = payload;
            }
            break;
          case 3: // Force update (fallthrough)
            fiber.flags = (fiber.flags & ~0x10000) | 0x80; // Remove 0x10000, add 0x80
          case 0: // Update state
            let partialState;
            if (typeof payload === "function") {
              partialState = payload.call(context, newBaseState, renderLanes);
            } else {
              partialState = payload;
            }
            if (partialState !== null && partialState !== undefined) {
              newBaseState = createObjectTracker({}, newBaseState, partialState);
            }
            break;
          case 2: // Capture update
            getPropertyOrDefault = true;
            break;
        }
        // If there'createInteractionAccessor a callback and a lane, schedule the effect
        if (callback !== null && updateLane !== 0) {
          fiber.flags |= 0x40; // Set the effect flag
          let effects = updateQueue.effects;
          if (effects === null) {
            updateQueue.effects = [update];
          } else {
            effects.push(update);
          }
        }
      } else {
        // This update is not processed in this render, keep isBlobOrFileLikeObject in the base update list
        const skippedUpdate = {
          eventTime,
          lane: updateLane,
          tag,
          payload,
          callback,
          next: null
        };
        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = skippedUpdate;
          baseStateForSkippedUpdates = newBaseState;
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = skippedUpdate;
        }
        newLanes |= updateLane;
      }

      update = update.next;
      if (update === null) {
        // If handleMissingDoctypeError'removeTrailingCharacters reached the end, check for more pending updates
        const morePending = updateQueue.shared.pending;
        if (morePending === null) {
          break;
        } else {
          // Merge in the new pending updates
          const last = morePending;
          update = last.next;
          last.next = null;
          updateQueue.lastBaseUpdate = last;
          updateQueue.shared.pending = null;
        }
      }
    } while (true);

    // If no updates were skipped, base state is the new state
    if (newLastBaseUpdate === null) {
      baseStateForSkippedUpdates = newBaseState;
    }
    updateQueue.baseState = baseStateForSkippedUpdates;
    updateQueue.firstBaseUpdate = newFirstBaseUpdate;
    updateQueue.lastBaseUpdate = newLastBaseUpdate;

    // Merge in lanes from interleaved updates if present
    const interleaved = updateQueue.shared.interleaved;
    if (interleaved !== null) {
      let interleavedUpdate = interleaved;
      do {
        newLanes |= interleavedUpdate.lane;
        interleavedUpdate = interleavedUpdate.next;
      } while (interleavedUpdate !== interleaved);
    } else if (firstBaseUpdate === null) {
      updateQueue.shared.lanes = 0;
    }

    createPropertyMatcher |= newLanes; // Merge lanes into global lanes (createPropertyMatcher is assumed global)
    fiber.lanes = newLanes;
    fiber.memoizedState = newBaseState;
  }
}

module.exports = processUpdateQueue;