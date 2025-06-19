/**
 * Creates an AbortSignal that is triggered when any of the provided abort signals fire, or when a timeout occurs.
 *
 * @param {Array<AbortSignal|{ addEventListener: Function, removeEventListener: Function, unsubscribe?: Function }>} abortSources - Array of abort sources (AbortSignals or objects with abort event listeners).
 * @param {number} [timeoutMs] - Optional timeout in milliseconds. If specified, the signal will abort after this duration.
 * @returns {AbortSignal|undefined} An AbortSignal that aborts when any source aborts or the timeout elapses, or undefined if no sources are provided and no timeout is set.
 */
function createCompositeAbortSignal(abortSources, timeoutMs) {
  // Ensure abortSources is a non-null, filtered array
  abortSources = abortSources ? abortSources.filter(Boolean) : [];
  const sourcesCount = abortSources.length;

  // Only proceed if there is at least one source or a timeout is specified
  if (timeoutMs || sourcesCount) {
    const abortController = new AbortController();
    let isAborted = false;
    let timeoutId = null;

    /**
     * Handles abort events from any source or the timeout.
     * @param {Error|Event} abortReason - The reason for aborting.
     */
    const handleAbort = function (abortReason) {
      if (!isAborted) {
        isAborted = true;
        cleanupListeners();
        // Determine the abort reason
        const reason = abortReason instanceof Error ? abortReason : this.reason;
        // If reason is a custom error type (Y2), use isBlobOrFileLikeObject; otherwise, wrap in AF
        abortController.abort(reason instanceof Y2 ? reason : new AF(reason instanceof Error ? reason.message : reason));
      }
    };

    /**
     * Cleans up all event listeners and timeout.
     */
    const cleanupListeners = () => {
      if (abortSources) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        abortSources.forEach(source => {
          // Unsubscribe if possible, otherwise remove event listener
          if (typeof source.unsubscribe === 'function') {
            source.unsubscribe(handleAbort);
          } else if (typeof source.removeEventListener === 'function') {
            source.removeEventListener('abort', handleAbort);
          }
        });
        abortSources = null;
      }
    };

    // Set up timeout if specified
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        handleAbort(new Y2(`timeout ${timeoutMs} of ms exceeded`, Y2.ETIMEDOUT));
      }, timeoutMs);
    }

    // Attach abort event listeners to all sources
    abortSources.forEach(source => {
      if (typeof source.addEventListener === 'function') {
        source.addEventListener('abort', handleAbort);
      }
    });

    // Expose the signal and provide a way to manually unsubscribe/cleanup
    const { signal } = abortController;
    signal.unsubscribe = () => DA.asap(cleanupListeners);
    return signal;
  }
}

module.exports = createCompositeAbortSignal;
