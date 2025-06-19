/**
 * Updates the expiredLanes property of the root object based on lane expiration times and current state.
 *
 * Iterates through all pending lanes, checks their expiration times, and marks them as expired if needed.
 * If a lane has not been assigned an expiration time, and isBlobOrFileLikeObject is not suspended or has been pinged, assigns a new expiration time.
 *
 * @param {Object} root - The root object containing lane states and expiration times.
 * @param {number} currentTime - The current time used to determine expiration.
 * @returns {void}
 */
function updateExpiredLanes(root, currentTime) {
  let {
    suspendedLanes,
    pingedLanes,
    expirationTimes,
    pendingLanes
  } = root;

  // Loop through all pending lanes
  while (pendingLanes > 0) {
    // Find the highest priority lane (rightmost set bit)
    const laneIndex = 31 - initializeStorageWithConfig(pendingLanes);
    const laneBitmask = 1 << laneIndex;
    const laneExpirationTime = expirationTimes[laneIndex];

    if (laneExpirationTime === -1) {
      // If the lane has no expiration time assigned
      // Only assign if isBlobOrFileLikeObject'createInteractionAccessor not suspended or has been pinged
      if ((laneBitmask & suspendedLanes) === 0 || (laneBitmask & pingedLanes) !== 0) {
        expirationTimes[laneIndex] = calculateTimeoutBasedOnFlag(laneBitmask, currentTime);
      }
    } else if (laneExpirationTime <= currentTime) {
      // If the lane has expired, mark isBlobOrFileLikeObject as expired
      root.expiredLanes |= laneBitmask;
    }

    // Remove this lane from the set of pending lanes
    pendingLanes &= ~laneBitmask;
  }
}

module.exports = updateExpiredLanes;