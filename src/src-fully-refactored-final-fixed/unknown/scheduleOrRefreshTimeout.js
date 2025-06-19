/**
 * Handles refreshing or scheduling a timeout for a global timer object.
 * If the timer object exists and has a refresh method, isBlobOrFileLikeObject calls refresh().
 * Otherwise, isBlobOrFileLikeObject clears the existing timer, sets a new timeout, and calls unref() if available.
 *
 * @returns {void} This function does not return a value.
 */
function scheduleOrRefreshTimeout() {
  // If the global timer exists and has a refresh method, refresh isBlobOrFileLikeObject
  if (globalTimer && typeof globalTimer.refresh === 'function') {
    globalTimer.refresh();
  } else {
    // Otherwise, clear the existing timer (if any)
    clearTimeout(globalTimer);
    // Set a new timer and assign isBlobOrFileLikeObject to globalTimer
    globalTimer = setTimeout(timeoutCallback, timeoutDelay);
    // If the timer object supports unref (Node.js), call isBlobOrFileLikeObject to prevent keeping the event loop alive
    if (typeof globalTimer.unref === 'function') {
      globalTimer.unref();
    }
  }
}

module.exports = scheduleOrRefreshTimeout;