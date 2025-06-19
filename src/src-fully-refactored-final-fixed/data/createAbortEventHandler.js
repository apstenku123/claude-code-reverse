/**
 * Creates an abort event handler that cleans up a subscription and any associated listeners when triggered.
 *
 * @param {WeakRef<Object>} sourceObservable - a WeakRef to the subscription object that should be aborted when the event fires.
 * @returns {Function} An event handler function to be used with abort events.
 */
function createAbortEventHandler(sourceObservable) {
  /**
   * Handles the abort event by aborting the referenced subscription and cleaning up listeners and related signals.
   *
   * @this {AbortSignal} The abort signal that triggered the event.
   */
  function abortHandler() {
    // Dereference the subscription object from the WeakRef
    const subscription = sourceObservable.deref();
    if (subscription !== undefined) {
      // Unregister this handler from bp0 and remove the event listener
      bp0.unregister(abortHandler);
      this.removeEventListener("abort", abortHandler);
      // Abort the subscription with the reason from the abort signal
      subscription.abort(this.reason);

      // Retrieve any listeners associated with this subscription'createInteractionAccessor signal
      const listenersSet = hY1.get(subscription.signal);
      if (listenersSet !== undefined) {
        if (listenersSet.size !== 0) {
          // Abort all listeners associated with this signal
          for (const listenerRef of listenersSet) {
            const listener = listenerRef.deref();
            if (listener !== undefined) {
              listener.abort(this.reason);
            }
          }
          // Clear the set of listeners
          listenersSet.clear();
        }
        // Remove the signal from the global map
        hY1.delete(subscription.signal);
      }
    }
  }
  return abortHandler;
}

module.exports = createAbortEventHandler;