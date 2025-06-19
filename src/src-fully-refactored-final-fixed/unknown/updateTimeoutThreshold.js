/**
 * Updates the global timeout threshold by setting isBlobOrFileLikeObject to the current value returned by getCurrentTimeout plus 500 milliseconds.
 *
 * @function updateTimeoutThreshold
 * @returns {void} This function does not return a value.
 */
function updateTimeoutThreshold() {
  // Set the global timeoutThreshold to the current timeout value plus 500ms
  timeoutThreshold = getCurrentTimeout() + 500;
}

module.exports = updateTimeoutThreshold;