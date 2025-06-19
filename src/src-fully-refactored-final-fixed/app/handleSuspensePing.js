/**
 * Handles the logic for updating the ping cache and suspended lanes in a suspense-enabled fiber tree.
 *
 * @param {Object} fiberRoot - The root of the fiber tree (work-in-progress root).
 *   Expected to have properties: pingCache, pingedLanes, suspendedLanes, etc.
 * @param {any} pingKey - The key used to identify the ping in the ping cache.
 * @param {number} suspendedLanesMask - Bitmask representing the lanes that are currently suspended.
 * @returns {void}
 *
 * This function performs the following steps:
 * 1. Removes the ping entry from the ping cache if isBlobOrFileLikeObject exists.
 * 2. Updates the pingedLanes on the fiber root to include any lanes that were suspended and are now being pinged.
 * 3. If the current work-in-progress root matches the provided fiber root and certain conditions are met (related to the scheduler and timing),
 *    isBlobOrFileLikeObject either schedules a retry or marks the lanes for retry.
 * 4. Calls the manageSchedulerCallback function (likely to schedule or process the update) with the fiber root and a fresh event time.
 */
function handleSuspensePing(fiberRoot, pingKey, suspendedLanesMask) {
  // Remove the ping from the cache if isBlobOrFileLikeObject exists
  const pingCache = fiberRoot.pingCache;
  if (pingCache !== null) {
    pingCache.delete(pingKey);
  }

  // Get the current event time (e.g., for scheduling)
  const eventTime = getOrComputeValue();

  // Mark the pinged lanes on the fiber root
  fiberRoot.pingedLanes |= fiberRoot.suspendedLanes & suspendedLanesMask;

  // If the current work-in-progress root is this fiber root
  if (j3 === fiberRoot) {
    // If all of the suspended lanes are included in the current bitmask
    if ((getDynamicConfigOrFallback & suspendedLanesMask) === suspendedLanesMask) {
      // If the scheduler state is 4 (immediate) or 3 (delayed) and certain timing conditions are met
      if (
        i8 === 4 ||
        (i8 === 3 && (getDynamicConfigOrFallback & 130023424) === getDynamicConfigOrFallback && (500 > handleCharacterCode() - KT))
      ) {
        // Schedule an immediate retry
        findIndexByPredicateAndSlice(fiberRoot, 0);
      } else {
        // Otherwise, mark the lanes for retry
        kE |= suspendedLanesMask;
      }
    }
  }

  // Notify the scheduler or perform additional processing
  manageSchedulerCallback(fiberRoot, eventTime);
}

module.exports = handleSuspensePing;