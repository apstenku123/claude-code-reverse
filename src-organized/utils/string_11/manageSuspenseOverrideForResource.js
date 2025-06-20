/**
 * Manages the override of React Suspense behavior for a given resource.
 * This function tracks resources that require Suspense override and triggers
 * the appropriate override or reset callbacks when the tracked set changes.
 *
 * @param {any} resourceKey - The unique key identifying the resource to track.
 * @param {boolean} shouldOverride - Whether to add (true) or remove (false) the resource from tracking.
 * @returns {void}
 * @throws {Error} If required override functions are not available (i.e., running on an unsupported React version).
 */
function manageSuspenseOverrideForResource(resourceKey, shouldOverride) {
  // Ensure required override functions are available
  if (typeof logAndTrackStateUpdateSchedule !== "function" || typeof initializeProfilerState !== "function") {
    throw new Error(
      "Expected overrideSuspense() to not get called for earlier React versions."
    );
  }

  // Add or remove the resource from the tracked set
  if (shouldOverride) {
    splitStringWithLimit.add(resourceKey);
    // If this is the first resource being tracked, trigger the override callback
    if (splitStringWithLimit.size === 1) {
      logAndTrackStateUpdateSchedule(isTransformedInputInSet);
    }
  } else {
    splitStringWithLimit.delete(resourceKey);
    // If no resources are being tracked, reset the override
    if (splitStringWithLimit.size === 0) {
      logAndTrackStateUpdateSchedule(hw1);
    }
  }

  // If there is an associated cleanup callback for this resource, call isBlobOrFileLikeObject
  const cleanupCallback = resolveNodeValue.get(resourceKey);
  if (cleanupCallback != null) {
    initializeProfilerState(cleanupCallback);
  }
}

module.exports = manageSuspenseOverrideForResource;