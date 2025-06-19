/**
 * Creates an operator that compares values from two observables using a provided equality function.
 * Emits false and completes if any pair of values are not equal, otherwise emits true when both complete with all values matched.
 *
 * @param {Observable} sourceObservable - The observable to compare against the input observable.
 * @param {Function} [equalityFn] - Optional equality function to compare values. Defaults to strict equality.
 * @returns {OperatorFunction} An RxJS operator function that emits a boolean result.
 */
function createEqualityBufferOperator(sourceObservable, equalityFn) {
  // Default equality function if none provided
  if (equalityFn === undefined) {
    equalityFn = function (a, b) {
      return a === b;
    };
  }

  return Pk9.operate(function (inputObservable, subscriber) {
    // Buffers for each observable
    const bufferA = dMA();
    const bufferB = dMA();

    /**
     * Emits the result and completes the subscriber
     * @param {boolean} result
     */
    const emitAndComplete = function (result) {
      subscriber.next(result);
      subscriber.complete();
    };

    /**
     * Subscribes to an observable, buffering its values and comparing them with the other buffer.
     * @param {Object} currentBuffer - Buffer for this observable
     * @param {Object} otherBuffer - Buffer for the other observable
     * @returns {Subscription}
     */
    const subscribeAndCompare = function (currentBuffer, otherBuffer) {
      const operatorSubscriber = Sk9.createOperatorSubscriber(
        subscriber,
        function (value) {
          const { buffer, complete } = otherBuffer;
          // If other buffer is empty, store value in current buffer
          if (buffer.length === 0) {
            if (complete) {
              // Other observable is complete but buffer is empty, so not equal
              emitAndComplete(false);
            } else {
              currentBuffer.buffer.push(value);
            }
          } else {
            // Compare values from both buffers
            if (!equalityFn(value, buffer.shift())) {
              emitAndComplete(false);
            }
          }
        },
        function () {
          // Mark this buffer as complete
          currentBuffer.complete = true;
          const { complete, buffer } = otherBuffer;
          // If both are complete and buffers are empty, emit true
          if (complete) {
            emitAndComplete(buffer.length === 0);
          }
          operatorSubscriber?.unsubscribe();
        }
      );
      return operatorSubscriber;
    };

    // Subscribe to both observables with cross-buffer comparison
    inputObservable.subscribe(subscribeAndCompare(bufferA, bufferB));
    _k9.innerFrom(sourceObservable).subscribe(subscribeAndCompare(bufferB, bufferA));
  });
}

module.exports = createEqualityBufferOperator;