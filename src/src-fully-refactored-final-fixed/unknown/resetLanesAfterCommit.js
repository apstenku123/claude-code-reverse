/**
 * Resets and cleans up lane-related state after committing work.
 *
 * This function clears pending, suspended, pinged, expired, mutable read, and entangled lanes
 * that are no longer relevant after a commit. It also resets event and expiration times for those lanes.
 *
 * @param {object} root - The root object containing lane state and metadata.
 * @param {number} remainingLanes - The bitmask of lanes that remain after the commit.
 * @returns {void}
 */
function resetLanesAfterCommit(root, remainingLanes) {
  // Compute lanes that were pending but are no longer present after the commit
  let removedLanes = root.pendingLanes & ~remainingLanes;

  // Update root lane state to reflect the new set of pending lanes
  root.pendingLanes = remainingLanes;
  root.suspendedLanes = 0;
  root.pingedLanes = 0;
  root.expiredLanes &= remainingLanes;
  root.mutableReadLanes &= remainingLanes;
  root.entangledLanes &= remainingLanes;

  // References to lane metadata arrays
  const entanglements = root.entanglements;
  const eventTimes = root.eventTimes;
  const expirationTimes = root.expirationTimes;

  // For each lane that was removed, reset its metadata
  while (removedLanes > 0) {
    // Find the highest set bit (lane index) in removedLanes
    const laneIndex = 31 - initializeStorageWithConfig(removedLanes);
    const laneBit = 1 << laneIndex;

    // Reset entanglement, event time, and expiration time for this lane
    entanglements[laneIndex] = 0;
    eventTimes[laneIndex] = -1;
    expirationTimes[laneIndex] = -1;

    // Clear this lane from removedLanes
    removedLanes &= ~laneBit;
  }
}

module.exports = resetLanesAfterCommit;