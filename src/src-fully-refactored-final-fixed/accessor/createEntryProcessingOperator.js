/**
 * Creates an operator that processes interaction entries from a source observable,
 * manages their subscriptions, and emits processed results to the output subscriber.
 *
 * @param {Function} processInteractionEntries - Function that processes an interaction entry and returns an observable.
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function createEntryProcessingOperator(processInteractionEntries) {
  return oP9.operate(function (sourceObservable, outputSubscriber) {
    let hasPendingEntry = false;
    let lastEntry = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner subscription and emits the last entry if pending.
     */
    const handleInnerComplete = function () {
      // Unsubscribe from any existing inner subscription
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending entry, emit isBlobOrFileLikeObject
      if (hasPendingEntry) {
        hasPendingEntry = false;
        const entryToEmit = lastEntry;
        lastEntry = null;
        outputSubscriber.next(entryToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        outputSubscriber,
        function handleNext(interactionEntry) {
          // Unsubscribe from any previous inner subscription
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingEntry = true;
          lastEntry = interactionEntry;

          // Create a new inner subscription to process the interaction entry
          innerSubscription = b$a.createOperatorSubscriber(
            outputSubscriber,
            handleInnerComplete,
            tP9.noop
          );

          // Subscribe to the observable returned by processing the entry
          eP9.innerFrom(processInteractionEntries(interactionEntry)).subscribe(innerSubscription);
        },
        function handleComplete() {
          // When the source completes, handle any pending entry and complete the output
          handleInnerComplete();
          outputSubscriber.complete();
        },
        undefined,
        function handleFinalize() {
          // Cleanup references on finalize
          lastEntry = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = createEntryProcessingOperator;