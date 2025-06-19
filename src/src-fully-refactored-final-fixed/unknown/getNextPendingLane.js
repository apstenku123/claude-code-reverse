/**
 * Determines the next set of pending lanes by masking out the highest priority lane (bit 30) from the given pendingLanes bitmask.
 * If there are any remaining lanes, returns the updated bitmask.
 * If not, checks if the highest priority lane (bit 30) was set and returns its value if so.
 * Otherwise, returns 0 indicating no pending lanes.
 *
 * @param {number} pendingLanes - Bitmask representing the set of pending lanes.
 * @returns {number} The next set of pending lanes, the highest priority lane if set, or 0 if none are pending.
 */
function getNextPendingLane(pendingLanes) {
  // Mask out the highest priority lane (bit 30)
  const maskedLanes = pendingLanes & -1073741825; // -1073741825 === ~0x40000000

  if (maskedLanes !== 0) {
    // If there are any lanes left after masking, return them
    return maskedLanes;
  } else if (pendingLanes & 1073741824) {
    // If the highest priority lane (bit 30) was set, return its value
    return 1073741824;
  } else {
    // No pending lanes
    return 0;
  }
}

module.exports = getNextPendingLane;