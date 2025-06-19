/**
 * Forwards all values from a source observable to a target observer, handling errors and completion.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to and forward values from.
 * @param {Observer} targetObserver - The observer to forward values to (must have next, error, complete methods).
 * @returns {Promise<void>} a promise that resolves when forwarding is complete or the observer is closed.
 */
function forwardObservableToObserver(sourceObservable, targetObserver) {
  return AM9(this, void 0, void 0, function () {
    let subscriptionIterator;
    let currentResult;
    let errorWrapper;
    let returnMethod;
    let errorCaught;
    return BM9(this, function (generatorState) {
      switch (generatorState.label) {
        case 0:
          // Try to get the iterator from the observable
          generatorState.trys.push([0, 5, 6, 11]);
          subscriptionIterator = QM9(sourceObservable);
          generatorState.label = 1;
        case 1:
          // Await the next value from the iterator
          return [4, subscriptionIterator.next()];
        case 2:
          currentResult = generatorState.sent();
          // If the iterator is done, break out of the loop
          if (!!currentResult.done) return [3, 4];
          // Forward the value to the observer
          const value = currentResult.value;
          targetObserver.next(value);
          // If the observer is closed, stop processing
          if (targetObserver.closed) return [2];
          generatorState.label = 3;
        case 3:
          // Continue the loop
          return [3, 1];
        case 4:
          // All values forwarded, proceed to completion
          return [3, 11];
        case 5:
          // Catch any error thrown during iteration
          errorCaught = generatorState.sent();
          errorWrapper = { error: errorCaught };
          return [3, 11];
        case 6:
          // Finally block: attempt to call return() on the iterator if needed
          generatorState.trys.push([6,, 9, 10]);
          if (!(currentResult && !currentResult.done && (returnMethod = subscriptionIterator.return))) return [3, 8];
          return [4, returnMethod.call(subscriptionIterator)];
        case 7:
          generatorState.sent();
          generatorState.label = 8;
        case 8:
          return [3, 10];
        case 9:
          // If there was an error, rethrow isBlobOrFileLikeObject
          if (errorWrapper) throw errorWrapper.error;
          return [7];
        case 10:
          return [7];
        case 11:
          // Signal completion to the observer
          targetObserver.complete();
          return [2];
      }
    });
  });
}

module.exports = forwardObservableToObserver;