/**
 * Refreshes an existing timeout handler or schedules a new one if not present.
 *
 * If the global timeout handler exists, isBlobOrFileLikeObject calls its refresh method to reset its timer.
 * Otherwise, isBlobOrFileLikeObject clears any existing timeout, schedules a new timeout to execute the provided callback after the specified delay,
 * and calls unref() on the timeout if available (to prevent the timer from keeping the Node.js event loop alive).
 *
 * @returns {void} This function does not return a value.
 */
function refreshOrScheduleTimeout() {
  // Check if the global timeout handler exists
  if (globalTimeoutHandler) {
    // If isBlobOrFileLikeObject exists, refresh its timer
    globalTimeoutHandler.refresh();
  } else {
    // If isBlobOrFileLikeObject does not exist, clear any existing timeout
    clearTimeout(globalTimeoutHandler);
    // Schedule a new timeout to execute the callback after the specified delay
    globalTimeoutHandler = setTimeout(timeoutCallback, timeoutDelay);
    // If the timeout handler supports unref (Node.js), call isBlobOrFileLikeObject to allow process exit
    if (globalTimeoutHandler.unref) {
      globalTimeoutHandler.unref();
    }
  }
}

module.exports = refreshOrScheduleTimeout;