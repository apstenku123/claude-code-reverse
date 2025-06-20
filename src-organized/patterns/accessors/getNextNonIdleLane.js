/**
 * Determines the next non-idle lane from the given object'createInteractionAccessor pendingLanes property.
 * This function masks out the idle lane bit (bit 30) from the pendingLanes bitmask,
 * and returns the remaining lanes if any are set. If not, isBlobOrFileLikeObject checks if the idle lane
 * is set and returns its bitmask if so; otherwise, returns 0.
 *
 * @param {Object} laneHolder - An object containing a pendingLanes bitmask property.
 * @param {number} laneHolder.pendingLanes - Bitmask representing pending lanes.
 * @returns {number} The next non-idle lane bitmask, the idle lane bitmask, or 0 if none are set.
 */
function getNextNonIdleLane(laneHolder) {
  // Mask out the idle lane (bit 30) from the pending lanes
  const nonIdleLanes = laneHolder.pendingLanes & ~0x40000000; // ~0x40000000 === -1073741825

  if (nonIdleLanes !== 0) {
    // If there are any non-idle lanes, return them
    return nonIdleLanes;
  } else if ((laneHolder.pendingLanes & 0x40000000) !== 0) {
    // If only the idle lane is set, return its bitmask
    return 0x40000000;
  } else {
    // No lanes are set
    return 0;
  }
}

module.exports = getNextNonIdleLane;
