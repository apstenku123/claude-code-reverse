/**
 * Buffers emitted values from the source Observable until a secondary Observable emits, then flushes the buffer.
 *
 * @param {Function} sourceObservableFactory - a function that returns an Observable. This Observable acts as a notifier to flush the buffer.
 * @returns {Function} An operator function to be used with an Observable.
 */
function bufferUntilSourceEmits(sourceObservableFactory) {
  return cT9.operate(function (inputObservable, subscriber) {
    let buffer = null; // Holds buffered values
    let notifierSubscription = null; // Subscription to the notifier Observable

    /**
     * Resets the buffer and subscribes to the notifier Observable.
     * When the notifier emits, flushes the buffer and resubscribes.
     */
    const resetBufferAndSubscribeNotifier = () => {
      // Unsubscribe from previous notifier if exists
      if (notifierSubscription !== null && notifierSubscription !== undefined) {
        notifierSubscription.unsubscribe();
      }
      const previousBuffer = buffer;
      buffer = [];
      // Emit the previous buffer if isBlobOrFileLikeObject exists
      if (previousBuffer) {
        subscriber.next(previousBuffer);
      }
      // Subscribe to the notifier Observable
      notifierSubscription = iT9.innerFrom(sourceObservableFactory()).subscribe(
        createObjectTracker$a.createOperatorSubscriber(
          subscriber,
          resetBufferAndSubscribeNotifier, // On notifier emission, flush buffer and resubscribe
          lT9.noop // On complete, do nothing
        )
      );
    };

    // Initialize by subscribing to the notifier
    resetBufferAndSubscribeNotifier();

    // Subscribe to the input Observable
    inputObservable.subscribe(
      createObjectTracker$a.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Push each value into the buffer if buffer exists
          if (buffer !== null && buffer !== undefined) {
            buffer.push(value);
          }
        },
        () => {
          // On complete, emit any remaining buffered values and complete
          if (buffer) {
            subscriber.next(buffer);
          }
          subscriber.complete();
        },
        undefined,
        () => {
          // On finalize, clean up references
          buffer = null;
          notifierSubscription = null;
        }
      )
    );
  });
}

module.exports = bufferUntilSourceEmits;