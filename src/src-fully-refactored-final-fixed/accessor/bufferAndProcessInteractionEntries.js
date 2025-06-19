/**
 * Buffers incoming values from the source observable, processes them using the provided
 * processInteractionEntries function, and emits the buffered results to the subscriber.
 * The buffer is reset and processed each time the source observable emits.
 *
 * @param {Function} processInteractionEntries - a function that returns an Observable when called. It processes an array of interaction entries, mapping each to a route name and storing associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify.
 * @returns {Function} An operator function that can be used with an Observable to buffer and process interaction entries.
 */
function bufferAndProcessInteractionEntries(processInteractionEntries) {
  return cT9.operate(function (sourceObservable, subscriber) {
    let buffer = null; // Holds buffered values
    let innerSubscription = null; // Holds the current inner subscription

    /**
     * Resets the buffer, processes the current buffer, and subscribes to the next inner observable.
     */
    const resetAndProcessBuffer = function () {
      // Unsubscribe from the previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      // Store the current buffer for emission
      const currentBuffer = buffer;
      // Reset the buffer to a new array
      buffer = [];
      // Emit the previous buffer if isBlobOrFileLikeObject exists
      if (currentBuffer) {
        subscriber.next(currentBuffer);
      }
      // Subscribe to the new inner observable returned by processInteractionEntries
      iT9.innerFrom(processInteractionEntries()).subscribe(
        innerSubscription = createObjectTracker$a.createOperatorSubscriber(
          subscriber,
          resetAndProcessBuffer, // On next, recursively reset and process buffer
          lT9.noop // On complete, do nothing
        )
      );
    };

    // Initialize the buffer and start processing
    resetAndProcessBuffer();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      createObjectTracker$a.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Push each emitted value into the buffer if buffer exists
          if (buffer !== null && buffer !== undefined) {
            buffer.push(value);
          }
        },
        function () {
          // On complete, emit any remaining buffered values and complete the subscriber
          if (buffer) {
            subscriber.next(buffer);
          }
          subscriber.complete();
        },
        undefined,
        function () {
          // On unsubscribe, clean up buffer and inner subscription
          buffer = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = bufferAndProcessInteractionEntries;