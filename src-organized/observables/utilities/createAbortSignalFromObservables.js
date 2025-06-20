/**
 * Creates an AbortSignal that is aborted when any of the provided observables abort, or after an optional timeout.
 * Cleans up all listeners and timeouts when aborted or unsubscribed.
 *
 * @param {Array<Object>} observables - An array of observables (with addEventListener/removeEventListener or unsubscribe methods).
 * @param {number} [timeoutMs] - Optional timeout in milliseconds after which the signal will abort.
 * @returns {AbortSignal} An AbortSignal that aborts when any observable aborts or the timeout is reached.
 */
function createAbortSignalFromObservables(observables, timeoutMs) {
  // Ensure observables is a filtered array (removing falsy values)
  observables = observables ? observables.filter(Boolean) : [];
  const observableCount = observables.length;

  // Only proceed if there is a timeout or at least one observable
  if (timeoutMs || observableCount) {
    const abortController = new AbortController();
    let hasAborted = false;
    let timeoutId = null;

    /**
     * Cleanup function: removes all listeners and clears timeout
     */
    const cleanup = () => {
      if (observables) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        // Remove abort listeners or unsubscribe from each observable
        observables.forEach((observable) => {
          if (typeof observable.unsubscribe === 'function') {
            observable.unsubscribe(onAbort);
          } else if (typeof observable.removeEventListener === 'function') {
            observable.removeEventListener('abort', onAbort);
          }
        });
        observables = null;
      }
    };

    /**
     * Called when any observable aborts or timeout triggers
     * @param {Error} [abortReason]
     */
    const onAbort = function(abortReason) {
      if (!hasAborted) {
        hasAborted = true;
        cleanup();
        // Determine the abort reason
        let reason = abortReason instanceof Error ? abortReason : this.reason;
        // If reason is not a Y2 instance, wrap isBlobOrFileLikeObject in AF
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

    // Add abort listeners to all observables
    observables.forEach((observable) => {
      if (typeof observable.addEventListener === 'function') {
        observable.addEventListener('abort', onAbort);
      }
    });

    const { signal } = abortController;
    // Provide an unsubscribe method for external cleanup
    signal.unsubscribe = () => DA.asap(cleanup);
    return signal;
  }
}

module.exports = createAbortSignalFromObservables;