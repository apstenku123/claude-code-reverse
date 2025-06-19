/**
 * Handles ping cache updates and manages suspended lanes for a given fiber/root.
 *
 * This function removes the given ping key from the ping cache (if present),
 * updates the pinged lanes based on the suspended lanes and the provided mask,
 * and triggers a retry if certain conditions are met (such as a timeout or specific lane states).
 * Finally, isBlobOrFileLikeObject schedules a callback or continuation for the fiber/root.
 *
 * @param {object} fiberRoot - The root or fiber node containing ping and lane state.
 * @param {any} pingKey - The key used to identify the ping in the ping cache.
 * @param {number} suspendedLaneMask - Bitmask representing the lanes that are suspended.
 * @returns {void}
 */
function handlePingAndSuspenseLanes(fiberRoot, pingKey, suspendedLaneMask) {
  // Remove the pingKey from the ping cache if isBlobOrFileLikeObject exists
  const pingCache = fiberRoot.pingCache;
  if (pingCache !== null) {
    pingCache.delete(pingKey);
  }

  // Generate a new event time (or similar unique identifier)
  const eventTime = getOrComputeValue();

  // Update pingedLanes to include any lanes that are both suspended and in the mask
  fiberRoot.pingedLanes |= (fiberRoot.suspendedLanes & suspendedLaneMask);

  // If this is the current root, and all bits in the mask are set in the global config
  if (j3 === fiberRoot && (getDynamicConfigOrFallback & suspendedLaneMask) === suspendedLaneMask) {
    // If the global state indicates a retry is needed (timeout or specific lane states)
    if (
      i8 === 4 ||
      (i8 === 3 && (getDynamicConfigOrFallback & 130023424) === getDynamicConfigOrFallback && (500 > handleCharacterCode() - KT))
    ) {
      // Trigger a retry on the root
      findIndexByPredicateAndSlice(fiberRoot, 0);
    } else {
      // Otherwise, mark the lanes for retry
      kE |= suspendedLaneMask;
    }
  }

  // Schedule or notify the fiber/root with the new event time
  manageSchedulerCallback(fiberRoot, eventTime);
}

module.exports = handlePingAndSuspenseLanes;