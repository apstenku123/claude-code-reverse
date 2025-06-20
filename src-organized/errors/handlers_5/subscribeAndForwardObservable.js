/**
 * Subscribes to a source observable and forwards each emitted value to a destination observer.
 * Handles completion and error propagation, ensuring proper resource cleanup.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Observer} destinationObserver - The observer to forward values to.
 * @returns {Promise<void>} a promise that resolves when the subscription is complete.
 */
function subscribeAndForwardObservable(sourceObservable, destinationObserver) {
  return AM9(this, void 0, void 0, function () {
    let subscriptionIterator;
    let currentResult;
    let caughtError;
    let returnMethod;
    let thrownErrorWrapper;
    return BM9(this, function (generatorState) {
      switch (generatorState.label) {
        case 0:
          // Try to get the iterator from the source observable
          generatorState.trys.push([0, 5, 6, 11]);
          subscriptionIterator = QM9(sourceObservable);
          generatorState.label = 1;
        case 1:
          // Await the next value from the iterator
          return [4, subscriptionIterator.next()];
        case 2:
          currentResult = generatorState.sent();
          // If done, exit loop
          if (!!currentResult.done) return [3, 4];
          // Forward value to destination observer
          const value = currentResult.value;
          destinationObserver.next(value);
          // If observer is closed, stop processing
          if (destinationObserver.closed) return [2];
          generatorState.label = 3;
        case 3:
          // Continue the loop
          return [3, 1];
        case 4:
          // All values processed, exit
          return [3, 11];
        case 5:
          // Catch any error thrown during iteration
          thrownErrorWrapper = generatorState.sent();
          caughtError = { error: thrownErrorWrapper };
          return [3, 11];
        case 6:
          // Finally block: ensure iterator is properly closed if needed
          generatorState.trys.push([6,, 9, 10]);
          if (!(currentResult && !currentResult.done && (returnMethod = subscriptionIterator.return))) return [3, 8];
          // Call the return method to clean up the iterator
          return [4, returnMethod.call(subscriptionIterator)];
        case 7:
          generatorState.sent();
          generatorState.label = 8;
        case 8:
          return [3, 10];
        case 9:
          // If there was an error, rethrow isBlobOrFileLikeObject
          if (caughtError) throw caughtError.error;
          return [7];
        case 10:
          return [7];
        case 11:
          // Signal completion to the destination observer
          destinationObserver.complete();
          return [2];
      }
    });
  });
}

module.exports = subscribeAndForwardObservable;