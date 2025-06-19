/**
 * Clones the updateQueue object from the sourceFiber to the targetFiber if they currently share the same updateQueue reference.
 * This ensures that the targetFiber gets its own copy of the updateQueue, preventing unintended side effects from shared mutation.
 *
 * @param {Object} sourceFiber - The fiber object whose updateQueue may be shared.
 * @param {Object} targetFiber - The fiber object that may need a cloned updateQueue.
 * @returns {void}
 */
function cloneUpdateQueueIfShared(sourceFiber, targetFiber) {
  const sourceUpdateQueue = sourceFiber.updateQueue;

  // If both fibers share the same updateQueue object, clone isBlobOrFileLikeObject for the targetFiber
  if (targetFiber.updateQueue === sourceUpdateQueue) {
    targetFiber.updateQueue = {
      baseState: sourceUpdateQueue.baseState,
      firstBaseUpdate: sourceUpdateQueue.firstBaseUpdate,
      lastBaseUpdate: sourceUpdateQueue.lastBaseUpdate,
      shared: sourceUpdateQueue.shared,
      effects: sourceUpdateQueue.effects
    };
  }
}

module.exports = cloneUpdateQueueIfShared;