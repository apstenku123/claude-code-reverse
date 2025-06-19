/**
 * Adds a new update to the update queue of a fiber node, ensuring correct queue structure and immutability.
 *
 * If the current fiber'createInteractionAccessor update queue is shared with its alternate (i.e., both point to the same queue),
 * this function clones the base updates to avoid mutating shared state, then appends the new update.
 * Otherwise, isBlobOrFileLikeObject simply appends the update to the end of the queue.
 *
 * @param {Object} fiberNode - The fiber node whose update queue will be modified.
 * @param {Object} newUpdate - The update object to enqueue. Should have properties: eventTime, lane, tag, payload, callback, next.
 * @returns {void}
 */
function enqueueUpdateToQueue(fiberNode, newUpdate) {
  const { updateQueue, alternate } = fiberNode;

  // If the alternate exists and both fiber nodes share the same updateQueue, clone the base updates
  if (alternate !== null && updateQueue === alternate.updateQueue) {
    let firstClonedUpdate = null;
    let lastClonedUpdate = null;
    let currentBaseUpdate = updateQueue.firstBaseUpdate;

    // Clone all base updates to avoid mutating shared queue
    if (currentBaseUpdate !== null) {
      do {
        const clonedUpdate = {
          eventTime: currentBaseUpdate.eventTime,
          lane: currentBaseUpdate.lane,
          tag: currentBaseUpdate.tag,
          payload: currentBaseUpdate.payload,
          callback: currentBaseUpdate.callback,
          next: null
        };
        if (lastClonedUpdate === null) {
          firstClonedUpdate = lastClonedUpdate = clonedUpdate;
        } else {
          lastClonedUpdate = lastClonedUpdate.next = clonedUpdate;
        }
        currentBaseUpdate = currentBaseUpdate.next;
      } while (currentBaseUpdate !== null);
      // Append the new update to the end of the cloned list
      if (lastClonedUpdate === null) {
        firstClonedUpdate = lastClonedUpdate = newUpdate;
      } else {
        lastClonedUpdate = lastClonedUpdate.next = newUpdate;
      }
    } else {
      // No base updates, so the new update is the only one
      firstClonedUpdate = lastClonedUpdate = newUpdate;
    }

    // Create a new updateQueue object for this fiber node
    const newUpdateQueue = {
      baseState: alternate.updateQueue.baseState,
      firstBaseUpdate: firstClonedUpdate,
      lastBaseUpdate: lastClonedUpdate,
      shared: alternate.updateQueue.shared,
      effects: alternate.updateQueue.effects
    };
    fiberNode.updateQueue = newUpdateQueue;
    return;
  }

  // If queues are not shared, simply append the new update to the end
  const lastBaseUpdate = updateQueue.lastBaseUpdate;
  if (lastBaseUpdate === null) {
    updateQueue.firstBaseUpdate = newUpdate;
  } else {
    lastBaseUpdate.next = newUpdate;
  }
  updateQueue.lastBaseUpdate = newUpdate;
}

module.exports = enqueueUpdateToQueue;