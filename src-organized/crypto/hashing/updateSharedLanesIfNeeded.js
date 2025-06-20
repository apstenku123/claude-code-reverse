/**
 * Updates the shared lanes in the update queue if certain conditions are met.
 *
 * @param {Object} fiberNode - The fiber node whose pending lanes are being checked.
 * @param {Object} updateQueueContainer - The container holding the update queue and shared lanes.
 * @param {number} renderLanes - The lanes currently being rendered (bitmask).
 * @returns {void}
 *
 * If the updateQueueContainer has a non-null updateQueue and the renderLanes
 * bitmask matches specific criteria, this function merges the shared lanes
 * with the pending lanes from the fiber node, updates the shared lanes,
 * and triggers a callback to handle the updated lanes.
 */
function updateSharedLanesIfNeeded(fiberNode, updateQueueContainer, renderLanes) {
  // Extract the updateQueue from the container
  const updateQueue = updateQueueContainer.updateQueue;

  // Proceed only if updateQueue exists
  if (updateQueue !== null) {
    // Extract the shared object from the updateQueue
    const sharedQueue = updateQueue.shared;

    // Check if the renderLanes bitmask matches the required mask
    // 4194240 is a bitmask used for specific lane types
    if ((renderLanes & 4194240) !== 0) {
      // Get the currently scheduled lanes from the shared queue
      let sharedLanes = sharedQueue.lanes;

      // Intersect shared lanes with the fiber'createInteractionAccessor pending lanes
      sharedLanes &= fiberNode.pendingLanes;

      // Merge the result into the renderLanes
      const mergedLanes = renderLanes | sharedLanes;

      // Update the shared lanes with the merged value
      sharedQueue.lanes = mergedLanes;

      // Call the external function to handle the updated lanes
      rZ(fiberNode, mergedLanes);
    }
  }
}

module.exports = updateSharedLanesIfNeeded;