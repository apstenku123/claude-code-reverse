/**
 * Marks specified lanes as suspended on the root object and resets their expiration times.
 *
 * This function updates the root'createInteractionAccessor suspended and pinged lanes bitmasks, then iterates through
 * each lane in the provided bitmask, resetting their expiration times to -1 (indicating no expiration).
 *
 * @param {object} root - The root object representing the fiber tree. Must have properties:
 *   - suspendedLanes {number}: Bitmask of currently suspended lanes
 *   - pingedLanes {number}: Bitmask of pinged lanes
 *   - expirationTimes {Array<number>}: Expiration times for each lane
 * @param {number} lanesToSuspend - Bitmask representing the lanes to mark as suspended
 * @returns {void}
 */
function markLanesAsSuspendedAndResetExpirationTimes(root, lanesToSuspend) {
  // Remove lanes that are in kE and createPropertyMatcherOrResolver from the lanesToSuspend bitmask
  lanesToSuspend &= ~kE;
  lanesToSuspend &= ~createPropertyMatcherOrResolver;

  // Mark these lanes as suspended
  root.suspendedLanes |= lanesToSuspend;
  // Remove these lanes from the pinged lanes
  root.pingedLanes &= ~lanesToSuspend;

  // Reset expiration times for each lane in the bitmask
  const expirationTimes = root.expirationTimes;
  while (lanesToSuspend > 0) {
    // Find the highest set bit (lane index)
    const laneIndex = 31 - initializeStorageWithConfig(lanesToSuspend);
    // Create a bitmask for this lane
    const laneBitmask = 1 << laneIndex;
    // Reset the expiration time for this lane
    expirationTimes[laneIndex] = -1;
    // Remove this lane from the bitmask
    lanesToSuspend &= ~laneBitmask;
  }
}

module.exports = markLanesAsSuspendedAndResetExpirationTimes;