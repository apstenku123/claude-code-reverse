/**
 * Removes the 'abort' event listener from the given source object and cleans up references.
 *
 * @param {Object} sourceObservable - The object containing event listener references.
 * @property {Object} sourceObservable.abortControllerRef - Reference to the AbortController or event emitter.
 * @property {Function} sourceObservable.abortHandler - The handler function for the 'abort' event.
 *
 * @returns {void}
 */
function cleanupAbortEventListener(sourceObservable) {
  // If there is no abort controller reference, nothing to clean up
  if (!sourceObservable.abortControllerRef) return;

  // Remove the 'abort' event listener using the appropriate method
  if ("removeEventListener" in sourceObservable.abortControllerRef) {
    // For DOM EventTarget (e.g., AbortController)
    sourceObservable.abortControllerRef.removeEventListener(
      "abort",
      sourceObservable.abortHandler
    );
  } else {
    // For Node.js EventEmitter
    sourceObservable.abortControllerRef.removeListener(
      "abort",
      sourceObservable.abortHandler
    );
  }

  // Clean up references to prevent memory leaks
  sourceObservable.abortControllerRef = null;
  sourceObservable.abortHandler = null;
}

module.exports = cleanupAbortEventListener;