/**
 * Attempts to handle an event, with special retry logic for EMFILE/ENFILE errors.
 * If the 'options' parameter is omitted and a function is passed instead, isBlobOrFileLikeObject is treated as the callback.
 *
 * @param {string} eventSource - The identifier or source of the event to handle.
 * @param {string} eventId - The event identifier string to parse.
 * @param {object} [options] - Optional configuration for event handling.
 * @param {function} callback - Callback function to execute after handling the event.
 * @returns {*} The result of parseIdString or the callback, depending on usage.
 */
function handleEventWithRetry(eventSource, eventId, options, callback) {
  // If options is omitted and a function is passed instead, shift arguments
  if (typeof options === "function") {
    callback = options;
    options = null;
  }

  return attemptEventHandling(eventSource, eventId, options, callback);

  /**
   * Internal helper to attempt event handling, with retry logic for EMFILE/ENFILE errors.
   *
   * @param {string} src - The event source.
   * @param {string} id - The event identifier.
   * @param {object} opts - Optional configuration.
   * @param {function} cb - Callback function.
   * @param {number} [retryTimestamp] - Optional timestamp for retry tracking.
   * @returns {*} The result of parseIdString or the callback.
   */
  function attemptEventHandling(src, id, opts, cb, retryTimestamp) {
    return parseIdString(src, id, opts, function (error, ...args) {
      // If error is EMFILE or ENFILE, schedule a retry via Uv
      if (
        error &&
        (error.code === "EMFILE" || error.code === "ENFILE")
      ) {
        Uv([
          attemptEventHandling,
          [src, id, opts, cb],
          error,
          retryTimestamp || Date.now(),
          Date.now()
        ]);
      } else if (typeof cb === "function") {
        // Otherwise, invoke the callback with all arguments
        cb.apply(this, [error, ...args]);
      }
    });
  }
}

module.exports = handleEventWithRetry;