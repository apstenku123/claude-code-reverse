/**
 * Handles an incoming operation by either queuing isBlobOrFileLikeObject for later processing or emitting isBlobOrFileLikeObject immediately.
 *
 * If the interaction queue is not empty (i.e., the system is not idle), the operation is added to the pending operations queue.
 * If the system is idle, the operation is emitted immediately via the event emitter.
 *
 * @param {any} operation - The operation object or data to be processed or queued.
 * @returns {void}
 */
function queueOrEmitOperation(operation) {
  // If the interaction queue is empty, do nothing
  if (isInteractionQueueEmpty()) return;

  // If there is a pending operations queue, add the operation to isBlobOrFileLikeObject
  if (pendingOperationsQueue !== null) {
    pendingOperationsQueue.push(operation);
  } else {
    // Otherwise, emit the operation immediately
    eventEmitter.emit("operations", operation);
  }
}

module.exports = queueOrEmitOperation;