/**
 * Creates an RxJS operator that compares values from two observables using a buffer and a comparison function.
 * Emits false and completes if any pair of values from the two streams do not match according to the comparator.
 * Otherwise, emits true if both streams complete with all values matching.
 *
 * @param {Observable} sourceObservable - The observable to compare against the input observable.
 * @param {Function} [comparator] - Optional comparison function. Defaults to strict equality.
 * @returns {OperatorFunction} An RxJS operator function that performs the buffered comparison.
 */
function createBufferComparisonOperator(sourceObservable, comparator = (a, b) => a === b) {
  return Pk9.operate(function (inputObservable, subscriber) {
    // Buffers for each observable
    const bufferA = dMA(); // Buffer for inputObservable
    const bufferB = dMA(); // Buffer for sourceObservable

    /**
     * Emits the result and completes the subscriber.
     * @param {boolean} result
     */
    const emitAndComplete = (result) => {
      subscriber.next(result);
      subscriber.complete();
    };

    /**
     * Creates a subscriber for one side of the comparison.
     * @param {Object} ownBuffer - Buffer for this observable.
     * @param {Object} otherBuffer - Buffer for the other observable.
     * @returns {Subscription}
     */
    const createBufferSubscriber = (ownBuffer, otherBuffer) => {
      // Use Sk9.createOperatorSubscriber to create a custom subscriber
      const operatorSubscriber = Sk9.createOperatorSubscriber(
        subscriber,
        (value) => {
          const { buffer: ownValueBuffer, complete: ownComplete } = otherBuffer;
          if (ownValueBuffer.length === 0) {
            // If the other buffer is empty, store the value in this buffer
            ownBuffer.buffer.push(value);
          } else {
            // Compare the value with the next value in the other buffer
            const otherValue = ownValueBuffer.shift();
            if (!comparator(value, otherValue)) {
              // If values do not match, emit false and complete
              emitAndComplete(false);
            }
          }
        },
        () => {
          // Mark this buffer as complete
          ownBuffer.complete = true;
          const { complete: otherComplete, buffer: otherValueBuffer } = otherBuffer;
          // If both buffers are complete and both are empty, emit true
          if (otherComplete && otherValueBuffer.length === 0) {
            emitAndComplete(true);
          }
          // Unsubscribe this subscriber
          operatorSubscriber?.unsubscribe();
        }
      );
      return operatorSubscriber;
    };

    // Subscribe to both observables with their respective buffers
    inputObservable.subscribe(createBufferSubscriber(bufferA, bufferB));
    _k9.innerFrom(sourceObservable).subscribe(createBufferSubscriber(bufferB, bufferA));
  });
}

module.exports = createBufferComparisonOperator;