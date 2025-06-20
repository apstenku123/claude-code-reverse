/**
 * Emits only the last operateWithLeadingTrailing values emitted by the source Observable when isBlobOrFileLikeObject completes.
 *
 * @param {number} count - The maximum number of last values to emit from the source Observable.
 * @returns {function} An operator function that can be used with Observable.pipe().
 *
 * If count is 0 or less, returns an operator that emits nothing (EMPTY Observable).
 * Otherwise, buffers the last operateWithLeadingTrailing values and emits them in order upon completion.
 */
function takeLastNOperator(count) {
  if (count <= 0) {
    // If count is zero or negative, return an operator that emits nothing
    return function () {
      return m_9.EMPTY;
    };
  }

  // Otherwise, return the operator function
  return d_9.operate(function (sourceObservable, subscriber) {
    let buffer = [];
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      u_9.createOperatorSubscriber(
        subscriber,
        function onNext(value) {
          buffer.push(value);
          // Maintain buffer size up to 'count' elements
          if (buffer.length > count) {
            buffer.shift();
          }
        },
        function onComplete() {
          let errorHolder;
          let iterator, iterationResult;
          try {
            // Iterate over buffered values and emit them to the subscriber
            iterator = h_9(buffer);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const bufferedValue = iterationResult.value;
              subscriber.next(bufferedValue);
              iterationResult = iterator.next();
            }
          } catch (error) {
            errorHolder = { error };
          } finally {
            // Ensure iterator is properly closed if needed
            try {
              if (iterationResult && !iterationResult.done && typeof iterator.return === 'function') {
                iterator.return();
              }
            } finally {
              // Rethrow any error caught during iteration
              if (errorHolder) throw errorHolder.error;
            }
          }
          // Signal completion to the subscriber
          subscriber.complete();
        },
        undefined, // No error handler
        function onUnsubscribe() {
          // Clean up buffer on unsubscription
          buffer = null;
        }
      )
    );
  });
}

module.exports = takeLastNOperator;