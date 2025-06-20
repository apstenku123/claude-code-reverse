/**
 * Manages the override of React Suspense behavior for a given input, 
 * ensuring compatibility with specific React versions and handling resource tracking.
 *
 * @param {any} inputKey - The unique key or identifier for the resource or input being tracked.
 * @param {boolean} shouldAdd - Determines whether to add (true) or remove (false) the inputKey from tracking.
 * @returns {void}
 * @throws {Error} If required override functions are not available (i.e., for unsupported React versions).
 */
function manageSuspenseOverrideForInput(inputKey, shouldAdd) {
  // Ensure required override functions are available (React version check)
  if (typeof logAndTrackStateUpdateSchedule !== "function" || typeof initializeProfilerState !== "function") {
    throw new Error("Expected overrideSuspense() to not get called for earlier React versions.");
  }

  // Add or remove the inputKey from the tracked set, and trigger appropriate override
  if (shouldAdd) {
    splitStringWithLimit.add(inputKey); // Add the key to the tracking set
    if (splitStringWithLimit.size === 1) {
      // If this is the first tracked key, enable the suspense override
      logAndTrackStateUpdateSchedule(isTransformedInputInSet);
    }
  } else {
    splitStringWithLimit.delete(inputKey); // Remove the key from the tracking set
    if (splitStringWithLimit.size === 0) {
      // If no more tracked keys, disable the suspense override
      logAndTrackStateUpdateSchedule(hw1);
    }
  }

  // Retrieve any associated selector for the inputKey and apply the initializeProfilerState function if present
  const selector = resolveNodeValue.get(inputKey);
  if (selector != null) {
    initializeProfilerState(selector);
  }
}

module.exports = manageSuspenseOverrideForInput;