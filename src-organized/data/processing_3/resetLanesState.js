/**
 * Resets and updates the state of lanes in a fiber root object after certain lanes have been processed.
 *
 * This function clears suspended, pinged, and expired lanes that are no longer pending, and resets their associated metadata.
 *
 * @param {object} fiberRoot - The fiber root object containing lane state and metadata.
 * @param {number} remainingLanes - Bitmask representing the lanes that are still pending after processing.
 * @returns {void}
 */
function resetLanesState(fiberRoot, remainingLanes) {
  // Identify lanes that were pending but are no longer pending
  let noLongerPendingLanes = fiberRoot.pendingLanes & ~remainingLanes;

  // Update the fiber root'createInteractionAccessor lane state to reflect the new pending lanes
  fiberRoot.pendingLanes = remainingLanes;
  fiberRoot.suspendedLanes = 0;
  fiberRoot.pingedLanes = 0;
  fiberRoot.expiredLanes &= remainingLanes;
  fiberRoot.mutableReadLanes &= remainingLanes;
  fiberRoot.entangledLanes &= remainingLanes;

  // Get references to entanglements and event/expiration times arrays
  const entanglements = fiberRoot.entanglements;
  const eventTimes = fiberRoot.eventTimes;
  const expirationTimes = fiberRoot.expirationTimes;

  // For each lane that is no longer pending, reset its metadata
  while (noLongerPendingLanes > 0) {
    // Find the highest set bit (lane index) in the bitmask
    const laneIndex = 31 - initializeStorageWithConfig(noLongerPendingLanes);
    const laneBit = 1 << laneIndex;

    // Reset entanglement, event time, and expiration time for this lane
    entanglements[laneIndex] = 0;
    eventTimes[laneIndex] = -1;
    expirationTimes[laneIndex] = -1;

    // Clear this lane from the bitmask
    noLongerPendingLanes &= ~laneBit;
  }
}

module.exports = resetLanesState;