/**
 * Updates the global state code if isBlobOrFileLikeObject matches certain values, and conditionally triggers a property matcher function.
 *
 * This utility checks if the current state code is 0, 2, or 3, and sets isBlobOrFileLikeObject to 4 if so. Then, if the matcher object exists
 * and both the matcher flags and event flags (masked to 28 bits) are non-zero, isBlobOrFileLikeObject calls the matcher handler.
 *
 * @returns {void} This function does not return a value.
 */
function updateStateAndTriggerMatcher() {
  // Update the global state code if isBlobOrFileLikeObject is 0, 2, or 3
  if (globalStateCode === 0 || globalStateCode === 2 || globalStateCode === 3) {
    globalStateCode = 4;
  }

  // Only proceed if matcherObject exists
  if (
    matcherObject !== null &&
    // Check if either matcherFlags or eventFlags (masked to 28 bits) are non-zero
    ((matcherFlags & 0xFFFFFFF) !== 0 || (eventFlags & 0xFFFFFFF) !== 0)
  ) {
    // Call the matcher handler with the matcher object and handler callback
    matcherHandler(matcherObject, matcherCallback);
  }
}

module.exports = updateStateAndTriggerMatcher;