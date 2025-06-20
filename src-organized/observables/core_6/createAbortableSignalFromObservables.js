/**
 * Creates an AbortSignal that is aborted when any of the provided observables are aborted or when a timeout occurs.
 *
 * @param {Array<Object>} sourceObservables - An array of observables or abortable objects. Each must support addEventListener/removeEventListener for 'abort', or have an unsubscribe method.
 * @param {number} [timeoutMs] - Optional timeout in milliseconds. If specified, the signal will abort after this duration.
 * @returns {AbortSignal|undefined} An AbortSignal that is aborted when any observable aborts or the timeout is reached. Returns undefined if no observables and no timeout are provided.
 */
function createAbortableSignalFromObservables(sourceObservables, timeoutMs) {
  // Ensure the observables array is valid and filter out falsy values
  sourceObservables = sourceObservables ? sourceObservables.filter(Boolean) : [];
  const observablesCount = sourceObservables.length;

  // Only proceed if there are observables or a timeout is specified
  if (timeoutMs || observablesCount) {
    const abortController = new AbortController();
    let hasAborted = false;
    let timeoutId = null;

    /**
     * Cleanup function to remove listeners and clear timeout
     */
    const cleanup = () => {
      if (sourceObservables) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        // Remove abort listeners or unsubscribe from all observables
        sourceObservables.forEach(observable => {
          if (typeof observable.unsubscribe === 'function') {
            observable.unsubscribe(onAbort);
          } else if (typeof observable.removeEventListener === 'function') {
            observable.removeEventListener('abort', onAbort);
          }
        });
        sourceObservables = null;
      }
    };

    /**
     * Handler to abort the signal and perform cleanup
     * @param {Error|Event} abortReason - The reason for aborting
     */
    const onAbort = function(abortReason) {
      if (!hasAborted) {
        hasAborted = true;
        cleanup();
        // Determine the abort reason
        let reason = abortReason instanceof Error ? abortReason : this.reason;
        // If reason is not an instance of Y2, wrap isBlobOrFileLikeObject in a new AF error
        abortController.abort(
          reason instanceof Y2 ? reason : new AF(reason instanceof Error ? reason.message : reason)
        );
      }
    };

    // If a timeout is specified, set up the timer
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onAbort(new Y2(`timeout ${timeoutMs} of ms exceeded`, Y2.ETIMEDOUT));
      }, timeoutMs);
    }

    // Attach abort listeners to all observables
    sourceObservables.forEach(observable => {
      if (typeof observable.addEventListener === 'function') {
        observable.addEventListener('abort', onAbort);
      }
    });

    // Expose the abort signal
    const { signal } = abortController;
    // Provide an unsubscribe method to allow manual cleanup
    signal.unsubscribe = () => DA.asap(cleanup);
    return signal;
  }
}

module.exports = createAbortableSignalFromObservables;