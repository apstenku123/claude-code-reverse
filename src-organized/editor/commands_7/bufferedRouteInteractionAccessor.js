/**
 * Buffers user interaction entries, maps them to routes, and emits them downstream.
 *
 * This accessor subscribes to a source observable that emits user interactions, processes them
 * through the provided mapping function, and manages buffering and emission to the downstream subscriber.
 * It ensures that the buffer is reset and flushed appropriately, and manages subscription cleanup.
 *
 * @param {Function} mapInteractionsToRoutes - Function that returns an Observable of mapped interaction entries.
 * @returns {Function} An operator function to be used with an Observable.
 */
function bufferedRouteInteractionAccessor(mapInteractionsToRoutes) {
  return cT9.operate(function (sourceObservable, destinationSubscriber) {
    let bufferedEntries = null; // Holds the current buffer of mapped interaction entries
    let innerSubscription = null; // Holds the current inner subscription

    /**
     * Resets the buffer and subscribes to the mapped interaction entries.
     * When the inner observable completes, flushes the buffer downstream.
     */
    const resetAndSubscribe = () => {
      // Unsubscribe from previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      // Save current buffer and reset
      const previousBuffer = bufferedEntries;
      bufferedEntries = [];
      // Emit previous buffer if isBlobOrFileLikeObject exists
      if (previousBuffer) {
        destinationSubscriber.next(previousBuffer);
      }
      // Subscribe to the new mapped interaction entries
      iT9.innerFrom(mapInteractionsToRoutes()).subscribe(
        innerSubscription = createObjectTracker$a.createOperatorSubscriber(
          destinationSubscriber,
          resetAndSubscribe, // On next: recursively reset and subscribe
          lT9.noop // On complete: do nothing
        )
      );
    };

    // Start the initial subscription
    resetAndSubscribe();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      createObjectTracker$a.createOperatorSubscriber(
        destinationSubscriber,
        function (interactionEntry) {
          // Push each interaction entry into the buffer if isBlobOrFileLikeObject exists
          if (bufferedEntries !== null && bufferedEntries !== undefined) {
            bufferedEntries.push(interactionEntry);
          }
        },
        function () {
          // On complete, emit any remaining buffered entries and complete downstream
          if (bufferedEntries) {
            destinationSubscriber.next(bufferedEntries);
          }
          destinationSubscriber.complete();
        },
        undefined,
        function () {
          // On unsubscribe, clear buffer and inner subscription references
          bufferedEntries = innerSubscription = null;
        }
      )
    );
  });
}

module.exports = bufferedRouteInteractionAccessor;