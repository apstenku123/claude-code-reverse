/**
 * Buffers values from the source observable, maps them to route names using the provided mapping function,
 * and emits the buffered array when the source completes or when the mapping function triggers a flush.
 *
 * @param {Function} mapInteractionsToRouteNames - a function that returns an Observable which processes an array of user interaction entries,
 *                                                mapping each to a route name and associated context. Ensures mapping size does not exceed a set limit
 *                                                and updates or evicts mappings based on duration.
 * @returns {Function} An operator function to be used with observables, which buffers and maps interactions as described.
 */
function bufferAndMapInteractionsToRouteNames(mapInteractionsToRouteNames) {
  return cT9.operate(function (sourceObservable, subscriber) {
    let bufferedInteractions = null; // Holds the current buffer of interactions
    let innerSubscription = null;    // Holds the current inner subscription

    /**
     * Flushes the current buffer by emitting isBlobOrFileLikeObject downstream and resets the buffer.
     * Also unsubscribes from the previous inner subscription and starts a new one.
     */
    const flushBufferAndResubscribe = () => {
      // Unsubscribe from previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }

      const previousBuffer = bufferedInteractions;
      bufferedInteractions = [];

      // Emit the previous buffer downstream if isBlobOrFileLikeObject exists
      if (previousBuffer) {
        subscriber.next(previousBuffer);
      }

      // Subscribe to the observable returned by the mapping function
      iT9.innerFrom(mapInteractionsToRouteNames()).subscribe(
        innerSubscription = createObjectTracker$a.createOperatorSubscriber(
          subscriber,
          flushBufferAndResubscribe, // On next, flush again
          lT9.noop                   // On complete, do nothing
        )
      );
    };

    // Start the first buffer and subscription
    flushBufferAndResubscribe();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      createObjectTracker$a.createOperatorSubscriber(
        subscriber,
        (interaction) => {
          // Push each incoming interaction into the buffer
          if (bufferedInteractions !== null && bufferedInteractions !== undefined) {
            bufferedInteractions.push(interaction);
          }
        },
        () => {
          // On complete, emit any remaining buffered interactions and complete downstream
          if (bufferedInteractions) {
            subscriber.next(bufferedInteractions);
          }
          subscriber.complete();
        },
        undefined,
        () => {
          // On unsubscribe, clean up internal state
          bufferedInteractions = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = bufferAndMapInteractionsToRouteNames;