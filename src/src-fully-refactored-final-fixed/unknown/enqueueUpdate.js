/**
 * Adds an update to the appropriate update queue (pending or interleaved) for a given fiber node.
 *
 * @param {Object} fiberNode - The fiber node whose update queue is being modified.
 * @param {Object} update - The update object to enqueue.
 * @param {number} renderLanes - The lanes used for scheduling this update.
 * @returns {null|undefined} Returns null if there is no update queue, otherwise undefined.
 */
function enqueueUpdate(fiberNode, update, renderLanes) {
  // Retrieve the update queue from the fiber node
  const updateQueue = fiberNode.updateQueue;
  if (updateQueue === null) {
    // No update queue present, nothing to enqueue
    return null;
  }

  // Access the shared queue object
  const sharedQueue = updateQueue.shared;

  // isValidAndTypeMatch is assumed to be a global bitmask indicating the current render phase
  // If the 2nd bit is set, handleMissingDoctypeError are in the render phase and should use the pending queue
  if ((isValidAndTypeMatch & 2) !== 0) {
    const pendingQueue = sharedQueue.pending;
    if (pendingQueue === null) {
      // If no pending updates, create a circular list with this update
      update.next = update;
    } else {
      // Insert the new update after the head of the pending queue
      update.next = pendingQueue.next;
      pendingQueue.next = update;
    }
    // Mark this update as the new tail of the pending queue
    sharedQueue.pending = update;
    // Schedule work for this fiber node
    _W(fiberNode, renderLanes);
    return;
  }

  // Otherwise, use the interleaved queue (for concurrent rendering)
  let interleavedQueue = sharedQueue.interleaved;
  if (interleavedQueue === null) {
    // If no interleaved updates, create a circular list and register the queue
    update.next = update;
    addValueToGlobalArray(sharedQueue); // Register this queue for interleaved updates
  } else {
    // Insert the new update after the head of the interleaved queue
    update.next = interleavedQueue.next;
    interleavedQueue.next = update;
  }
  // Mark this update as the new tail of the interleaved queue
  sharedQueue.interleaved = update;
  // Schedule work for this fiber node
  _W(fiberNode, renderLanes);
}

module.exports = enqueueUpdate;