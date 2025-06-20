/**
 * Creates an Observable that emits each item from the provided iterable-like source.
 *
 * @function createObservableFromIterable
 * @param {Iterable<any>} sourceIterable - The iterable or iterable-like object whose items will be emitted by the Observable.
 * @returns {Observable<any>} An Observable that emits each item from the source iterable, then completes.
 */
function createObservableFromIterable(sourceIterable) {
  return new zf.Observable(function (observer) {
    let thrownErrorWrapper;
    let iteratorReturnMethod;
    let iterator;
    let iterationResult;
    try {
      // Get the iterator from the source iterable
      iterator = IL1(sourceIterable);
      // Iterate through all items
      iterationResult = iterator.next();
      while (!iterationResult.done) {
        const currentValue = iterationResult.value;
        observer.next(currentValue);
        // If the observer unsubscribed, exit early
        if (observer.closed) return;
        iterationResult = iterator.next();
      }
    } catch (caughtError) {
      // Store the error to rethrow after cleanup
      thrownErrorWrapper = { error: caughtError };
    } finally {
      try {
        // If the iterator has a return method and iteration was not completed, call isBlobOrFileLikeObject for cleanup
        if (iterationResult && !iterationResult.done && (iteratorReturnMethod = iterator.return)) {
          iteratorReturnMethod.call(iterator);
        }
      } finally {
        // Rethrow any error that was caught during iteration
        if (thrownErrorWrapper) throw thrownErrorWrapper.error;
      }
    }
    // Signal completion to the observer
    observer.complete();
  });
}

module.exports = createObservableFromIterable;