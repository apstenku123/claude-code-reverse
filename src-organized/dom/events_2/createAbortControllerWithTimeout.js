/**
 * Creates an AbortController that listens to an array of abort signals (observables) and/or a timeout.
 * If any of the signals abort or the timeout is reached, the controller aborts with the appropriate reason.
 *
 * @param {Array<EventTarget|{unsubscribe:Function,addEventListener:Function,removeEventListener:Function}>} abortSources - Array of abort signal sources (EventTargets or objects with unsubscribe/addEventListener methods).
 * @param {number} [timeoutMs] - Optional timeout in milliseconds. If specified, aborts after this duration.
 * @returns {AbortSignal & {unsubscribe: Function}} The abort signal with an added unsubscribe method to clean up listeners.
 */
function createAbortControllerWithTimeout(abortSources, timeoutMs) {
  // Ensure abortSources is a filtered array (removes falsy values)
  abortSources = abortSources ? abortSources.filter(Boolean) : [];
  const sourcesCount = abortSources.length;

  // Only proceed if there are abort sources or a timeout is specified
  if (timeoutMs || sourcesCount) {
    const abortController = new AbortController();
    let hasAborted = false;
    let timeoutId = null;

    /**
     * Cleanup function to remove all listeners and clear timeout
     */
    const cleanup = () => {
      if (abortSources) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        abortSources.forEach(source => {
          // Remove abort listener depending on the API
          if (typeof source.unsubscribe === 'function') {
            source.unsubscribe(onAbort);
          } else if (typeof source.removeEventListener === 'function') {
            source.removeEventListener('abort', onAbort);
          }
        });
        abortSources = null;
      }
    };

    /**
     * Handler for abort events or timeout
     * @param {Error|Event} abortReason
     */
    function onAbort(abortReason) {
      if (!hasAborted) {
        hasAborted = true;
        cleanup();
        // Determine the abort reason
        let reason = abortReason instanceof Error ? abortReason : this.reason;
        // If reason is not a custom error, wrap isBlobOrFileLikeObject
        abortController.abort(
          reason instanceof Y2 ? reason : new AF(reason instanceof Error ? reason.message : reason)
        );
      }
    }

    // Set up timeout if specified
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onAbort(new Y2(`timeout ${timeoutMs} of ms exceeded`, Y2.ETIMEDOUT));
      }, timeoutMs);
    }

    // Attach abort listeners to all sources
    abortSources.forEach(source => {
      if (typeof source.addEventListener === 'function') {
        source.addEventListener('abort', onAbort);
      }
    });

    // Expose the signal and add an unsubscribe method for cleanup
    const { signal } = abortController;
    signal.unsubscribe = () => DA.asap(cleanup);
    return signal;
  }
}

module.exports = createAbortControllerWithTimeout;