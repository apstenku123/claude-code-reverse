/**
 * Registers a store snapshot for tracking in the update queue.
 *
 * This function marks the provided store fiber with a specific flag, creates a snapshot object
 * containing the snapshot getter and value, and ensures isBlobOrFileLikeObject is tracked in the global update queue (w9.updateQueue).
 *
 * @param {Object} storeFiber - The fiber object representing the store to be tracked. Must have a 'flags' property.
 * @param {Function} getSnapshot - a function that returns the current snapshot of the store.
 * @param {any} snapshotValue - The current value of the store snapshot.
 * @returns {void}
 */
function registerStoreSnapshot(storeFiber, getSnapshot, snapshotValue) {
  // Set the 16384 bit flag on the store fiber to indicate isBlobOrFileLikeObject is tracked
  storeFiber.flags |= 16384;

  // Create a store snapshot object with the getter and value
  const storeSnapshot = {
    getSnapshot: getSnapshot,
    value: snapshotValue
  };

  // Access the global update queue
  let updateQueue = w9.updateQueue;

  if (updateQueue === null) {
    // If the update queue does not exist, initialize isBlobOrFileLikeObject and add the store snapshot
    updateQueue = {
      lastEffect: null,
      stores: null
    };
    w9.updateQueue = updateQueue;
    updateQueue.stores = [storeSnapshot];
  } else {
    // If the update queue exists, add the store snapshot to the stores array
    if (updateQueue.stores === null) {
      updateQueue.stores = [storeSnapshot];
    } else {
      updateQueue.stores.push(storeSnapshot);
    }
  }
}

module.exports = registerStoreSnapshot;