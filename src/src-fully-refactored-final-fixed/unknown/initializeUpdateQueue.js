/**
 * Initializes the update queue for a given fiber node.
 *
 * This function sets up the updateQueue property on the provided fiber node object.
 * The update queue tracks state updates and their effects for the fiber during reconciliation.
 *
 * @param {Object} fiberNode - The fiber node object to initialize the update queue for. Must have a memoizedState property.
 * @returns {void} This function modifies the fiberNode in place and does not return a value.
 */
function initializeUpdateQueue(fiberNode) {
  // The updateQueue object holds all pending and processed updates for this fiber
  fiberNode.updateQueue = {
    // The base state is the last committed state before any new updates are processed
    baseState: fiberNode.memoizedState,
    // The first update in the base update list (if any)
    firstBaseUpdate: null,
    // The last update in the base update list (if any)
    lastBaseUpdate: null,
    // Shared queue for concurrent updates and interleaved updates
    shared: {
      // Pending updates that have not yet been processed
      pending: null,
      // Interleaved updates for concurrent rendering
      interleaved: null,
      // Bitmask representing lanes for scheduling
      lanes: 0
    },
    // Effects to be applied after updates are processed
    effects: null
  };
}

module.exports = initializeUpdateQueue;