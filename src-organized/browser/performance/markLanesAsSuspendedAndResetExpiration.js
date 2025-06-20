/**
 * Updates the given FiberRoot'createInteractionAccessor suspended and pinged lanes, and resets expiration times for affected lanes.
 *
 * @param {Object} fiberRoot - The FiberRoot object whose lanes are being updated.
 *   Expected to have properties: suspendedLanes (number), pingedLanes (number), expirationTimes (Array).
 * @param {number} lanesToSuspend - Bitmask of lanes to suspend and reset.
 * @returns {void}
 *
 * This function clears the provided lanes from the constants kE and createPropertyMatcherOrResolver, marks them as suspended,
 * clears them from pinged lanes, and resets their expiration times to -1.
 */
function markLanesAsSuspendedAndResetExpiration(fiberRoot, lanesToSuspend) {
  // Remove lanes that are in kE and createPropertyMatcherOrResolver from the lanesToSuspend bitmask
  lanesToSuspend &= ~kE;
  lanesToSuspend &= ~createPropertyMatcherOrResolver;

  // Mark these lanes as suspended
  fiberRoot.suspendedLanes |= lanesToSuspend;
  // Remove these lanes from pinged lanes
  fiberRoot.pingedLanes &= ~lanesToSuspend;

  // Reset expiration times for each affected lane
  const expirationTimes = fiberRoot.expirationTimes;
  let remainingLanes = lanesToSuspend;
  while (remainingLanes > 0) {
    // Find the highest set bit index (lane number)
    const laneIndex = 31 - initializeStorageWithConfig(remainingLanes);
    // Create a bitmask for this lane
    const laneBit = 1 << laneIndex;
    // Reset expiration time for this lane
    expirationTimes[laneIndex] = -1;
    // Remove this lane from the bitmask
    remainingLanes &= ~laneBit;
  }
}

module.exports = markLanesAsSuspendedAndResetExpiration;