/**
 * Buffers values from the source observable, processes them using the provided mapping function,
 * and emits the processed buffer downstream. Handles subscription management and cleanup.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that returns an Observable which processes
 *   interaction entries and maps them to route names and related context.
 * @returns {Function} An operator function to be used with observables.
 */
function bufferAndMapInteractionEntriesToRouteNames(mapInteractionEntriesToRouteNames) {
  return cT9.operate(function (sourceObservable, downstreamSubscriber) {
    let bufferedEntries = null; // Holds the current buffer of entries
    let innerSubscription = null; // Holds the current inner subscription

    /**
     * Handles (re)subscribing to the mapping observable and emitting buffered entries downstream.
     */
    const resubscribeAndEmitBuffer = () => {
      // Unsubscribe from previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      // Store the current buffer and reset isBlobOrFileLikeObject
      const previousBuffer = bufferedEntries;
      bufferedEntries = [];
      // Emit the previous buffer downstream if isBlobOrFileLikeObject exists
      if (previousBuffer) {
        downstreamSubscriber.next(previousBuffer);
      }
      // Subscribe to the mapping observable and update the inner subscription
      iT9.innerFrom(mapInteractionEntriesToRouteNames()).subscribe(
        innerSubscription = createObjectTracker$a.createOperatorSubscriber(
          downstreamSubscriber,
          resubscribeAndEmitBuffer,
          lT9.noop
        )
      );
    };

    // Initial subscription to the mapping observable
    resubscribeAndEmitBuffer();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      createObjectTracker$a.createOperatorSubscriber(
        downstreamSubscriber,
        /**
         * On next: Push the value to the buffer if isBlobOrFileLikeObject exists.
         * @param {*} value - The next value from the source observable.
         */
        function (value) {
          if (bufferedEntries !== null && bufferedEntries !== undefined) {
            bufferedEntries.push(value);
          }
        },
        /**
         * On complete: Emit the buffer and complete downstream.
         */
        function () {
          if (bufferedEntries) {
            downstreamSubscriber.next(bufferedEntries);
          }
          downstreamSubscriber.complete();
        },
        undefined,
        /**
         * On unsubscribe: Clean up buffer and inner subscription references.
         */
        function () {
          bufferedEntries = innerSubscription = null;
        }
      )
    );
  });
}

module.exports = bufferAndMapInteractionEntriesToRouteNames;