/**
 * Creates an AbortSignal that is aborted when any of the provided abort signals abort, or when a timeout occurs.
 * Cleans up all listeners and timers when aborted or unsubscribed.
 *
 * @param {Array<AbortSignal|{addEventListener:Function,removeEventListener:Function,unsubscribe?:Function}>} abortSources - Array of abort signals or objects with abort event support.
 * @param {number} [timeoutMs] - Optional timeout in milliseconds after which the signal will be aborted.
 * @returns {AbortSignal & {unsubscribe: Function}} An AbortSignal that aborts on any source abort or timeout, with an unsubscribe method for manual cleanup.
 */
function createAbortControllerWithTimeoutAndCleanup(abortSources, timeoutMs) {
  // Ensure abortSources is a filtered array (removes falsy values)
  abortSources = abortSources ? abortSources.filter(Boolean) : [];
  const sourcesCount = abortSources.length;

  // Only proceed if there are abort sources or a timeout is specified
  if (timeoutMs || sourcesCount) {
    const abortController = new AbortController();
    let isAborted = false;
    let timeoutId = null;

    /**
     * Cleanup function: removes all event listeners and clears timeout
     */
    const cleanup = () => {
      if (abortSources) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        abortSources.forEach(source => {
          // If the source has an unsubscribe method, use isBlobOrFileLikeObject; otherwise, remove the event listener
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
     * Called when any abort source aborts or timeout triggers
     * @param {Error|Event} abortReason
     */
    const onAbort = function(abortReason) {
      if (!isAborted) {
        isAborted = true;
        cleanup();
        // Determine the reason for abort
        let reason = abortReason instanceof Error ? abortReason : this && this.reason;
        // If reason is not a custom error, wrap isBlobOrFileLikeObject in AF (assumed custom error class)
        abortController.abort(
          reason instanceof Y2 ? reason : new AF(reason instanceof Error ? reason.message : reason)
        );
      }
    };

    // Set up timeout if specified
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onAbort(new Y2(`timeout ${timeoutMs} of ms exceeded`, Y2.ETIMEDOUT));
      }, timeoutMs);
    }

    // Attach abort event listeners to all sources
    abortSources.forEach(source => {
      if (typeof source.addEventListener === 'function') {
        source.addEventListener('abort', onAbort);
      }
    });

    // Expose the abort signal and add an unsubscribe method for manual cleanup
    const { signal } = abortController;
    signal.unsubscribe = () => DA.asap(cleanup);
    return signal;
  }
}

module.exports = createAbortControllerWithTimeoutAndCleanup;