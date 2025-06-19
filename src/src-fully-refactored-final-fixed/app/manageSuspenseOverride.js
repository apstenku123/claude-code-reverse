/**
 * Manages the override of React Suspense behavior for a given resource.
 * Ensures that override functions are only called for supported React versions,
 * and tracks resources to determine when to enable or disable the override.
 *
 * @param {any} resourceKey - The unique key identifying the resource to track.
 * @param {boolean} shouldEnableOverride - Whether to enable or disable the override for this resource.
 * @returns {void}
 */
function manageSuspenseOverride(resourceKey, shouldEnableOverride) {
  // Ensure that the override functions are available (i.e., React version supports them)
  if (typeof logAndTrackStateUpdateSchedule !== "function" || typeof initializeProfilerState !== "function") {
    throw new Error("Expected overrideSuspense() to not get called for earlier React versions.");
  }

  // Add or remove the resource from the tracking set
  if (shouldEnableOverride) {
    splitStringWithLimit.add(resourceKey);
    // If this is the first resource being tracked, enable the override
    if (splitStringWithLimit.size === 1) {
      logAndTrackStateUpdateSchedule(isTransformedInputInSet);
    }
  } else {
    splitStringWithLimit.delete(resourceKey);
    // If no resources are being tracked, disable the override
    if (splitStringWithLimit.size === 0) {
      logAndTrackStateUpdateSchedule(hw1);
    }
  }

  // Retrieve any associated cleanup or effect for this resource
  const cleanupCallback = resolveNodeValue.get(resourceKey);
  // If a cleanup callback exists, invoke isBlobOrFileLikeObject
  if (cleanupCallback != null) {
    initializeProfilerState(cleanupCallback);
  }
}

module.exports = manageSuspenseOverride;