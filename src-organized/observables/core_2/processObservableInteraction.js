/**
 * Processes an observable interaction entry, ensuring isBlobOrFileLikeObject is not already being processed,
 * invokes the processObservableQueue handler, and manages the internal buffer if isBlobOrFileLikeObject exceeds the threshold.
 *
 * @param {Object} sourceObservable - The observable interaction entry to process. Must have properties for state, buffer, and counters.
 * @param {any} config - Configuration or context to pass to the processObservableQueue handler.
 * @returns {void}
 */
function processObservableInteraction(sourceObservable, config) {
  // External property keys/constants (assumed to be imported or defined elsewhere)
  const STATE_KEY = h_; // Key for the processing state property
  const BUFFER_KEY = iV; // Key for the buffer array property
  const BUFFER_SIZE_KEY = RN; // Key for the buffer size property
  const TOTAL_SIZE_KEY = nV; // Key for the total size property

  // If the observable is already being processed (state === 2), exit early
  if (sourceObservable[STATE_KEY] === 2) {
    return;
  }

  // Mark as processing
  sourceObservable[STATE_KEY] = 2;

  // Invoke the handler with the observable and config
  processObservableQueue(sourceObservable, config);

  // Reset processing state
  sourceObservable[STATE_KEY] = 0;

  // If the buffer size exceeds 256, clear the buffer and update counters
  if (sourceObservable[BUFFER_SIZE_KEY] > 256) {
    // Remove processed entries from the buffer
    sourceObservable[BUFFER_KEY].splice(0, sourceObservable[BUFFER_SIZE_KEY]);
    // Decrease the total size by the number of removed entries
    sourceObservable[TOTAL_SIZE_KEY] -= sourceObservable[BUFFER_SIZE_KEY];
    // Reset the buffer size counter
    sourceObservable[BUFFER_SIZE_KEY] = 0;
  }
}

module.exports = processObservableInteraction;