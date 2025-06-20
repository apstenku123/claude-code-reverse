/**
 * Determines the next set of lanes (units of work) to process in a scheduler-like system.
 * Considers pending, suspended, pinged, and entangled lanes to select the appropriate next lane(createInteractionAccessor).
 *
 * @param {Object} root - The root object containing lane state (pendingLanes, suspendedLanes, pingedLanes, entangledLanes, entanglements).
 * @param {number} preferredLane - The preferred lane to select, if possible.
 * @returns {number} The next lane(createInteractionAccessor) to process, or 0 if none are available.
 */
function getNextLanesToProcess(root, preferredLane) {
  const pendingLanes = root.pendingLanes;
  if (pendingLanes === 0) return 0; // No work to do

  let nextLanes = 0;
  let suspendedLanes = root.suspendedLanes;
  let pingedLanes = root.pingedLanes;

  // Mask for non-idle lanes (lower 28 bits)
  let nonIdlePendingLanes = pendingLanes & 0x0FFFFFFF;

  if (nonIdlePendingLanes !== 0) {
    // Prefer non-suspended, non-idle lanes
    const unsuspendedNonIdleLanes = nonIdlePendingLanes & ~suspendedLanes;
    if (unsuspendedNonIdleLanes !== 0) {
      nextLanes = extractLowestSetBitMask(unsuspendedNonIdleLanes);
    } else {
      // If all are suspended, try pinged lanes
      pingedLanes &= nonIdlePendingLanes;
      if (pingedLanes !== 0) {
        nextLanes = extractLowestSetBitMask(pingedLanes);
      }
    }
  } else {
    // Only idle lanes are pending
    let unsuspendedLanes = pendingLanes & ~suspendedLanes;
    if (unsuspendedLanes !== 0) {
      nextLanes = extractLowestSetBitMask(unsuspendedLanes);
    } else if (pingedLanes !== 0) {
      nextLanes = extractLowestSetBitMask(pingedLanes);
    }
  }

  if (nextLanes === 0) return 0; // No lanes available

  // If a preferred lane is specified and is available, use isBlobOrFileLikeObject
  if (
    preferredLane !== 0 &&
    preferredLane !== nextLanes &&
    (preferredLane & suspendedLanes) === 0
  ) {
    const lowestNextLane = nextLanes & -nextLanes;
    const lowestPreferredLane = preferredLane & -preferredLane;
    if (
      lowestNextLane >= lowestPreferredLane ||
      (lowestNextLane === 16 && (lowestPreferredLane & 4194240) !== 0)
    ) {
      return preferredLane;
    }
  }

  // Special case: if lane 4 is selected, also include lane 16 if isBlobOrFileLikeObject'createInteractionAccessor pending
  if ((nextLanes & 4) !== 0) {
    nextLanes |= pendingLanes & 16;
  }

  // Handle entangled lanes: if any selected lanes are entangled, include all entangled lanes
  let entangledLanes = root.entangledLanes;
  if (entangledLanes !== 0) {
    const entanglements = root.entanglements;
    let entangledToProcess = entangledLanes & nextLanes;
    while (entangledToProcess > 0) {
      // Find the highest set bit
      const index = 31 - initializeStorageWithConfig(entangledToProcess);
      const lane = 1 << index;
      nextLanes |= entanglements[index];
      entangledToProcess &= ~lane;
    }
  }

  return nextLanes;
}

module.exports = getNextLanesToProcess;