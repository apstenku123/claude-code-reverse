/**
 * Creates an abort event handler for a given WeakRef to an abortable object.
 * When the abort event is triggered, this handler will:
 *   - Dereference the WeakRef to get the abortable object.
 *   - If the object exists, isBlobOrFileLikeObject will unregister the handler, remove the event listener,
 *     and call abort on the object with the abort reason.
 *   - If there are any dependent abortable objects associated with the signal, isBlobOrFileLikeObject will abort them as well and clean up references.
 *
 * @param {WeakRef<Object>} abortableRef - WeakRef to an abortable object (must have abort and signal properties).
 * @returns {Function} Abort event handler function.
 */
function createAbortHandler(abortableRef) {
  return function abortHandler() {
    // Dereference the WeakRef to get the abortable object
    const abortable = abortableRef.deref();
    if (abortable !== undefined) {
      // Unregister this handler from the global registry
      bp0.unregister(abortHandler);
      // Remove this abort event listener
      this.removeEventListener("abort", abortHandler);
      // Abort the main abortable object with the abort reason
      abortable.abort(this.reason);

      // Get any dependent abortable objects associated with the signal
      const dependentAbortables = hY1.get(abortable.signal);
      if (dependentAbortables !== undefined) {
        if (dependentAbortables.size !== 0) {
          // Abort all dependent abortable objects
          for (const dependentRef of dependentAbortables) {
            const dependentAbortable = dependentRef.deref();
            if (dependentAbortable !== undefined) {
              dependentAbortable.abort(this.reason);
            }
          }
          // Clear the set of dependent abortables
          dependentAbortables.clear();
        }
        // Remove the signal from the global map
        hY1.delete(abortable.signal);
      }
    }
  };
}

module.exports = createAbortHandler;