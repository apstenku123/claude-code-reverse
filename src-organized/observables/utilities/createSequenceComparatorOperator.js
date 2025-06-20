/**
 * Creates an RxJS operator that compares two observable sequences element-wise using a provided comparator function.
 * Emits true if all corresponding elements are equal (according to the comparator), otherwise emits false and completes early.
 *
 * @param {Observable} sourceObservable - The observable sequence to compare against the source.
 * @param {Function} [comparator] - Optional comparison function (a, b) => boolean. Defaults to strict equality.
 * @returns {OperatorFunction} An RxJS operator function that emits a boolean indicating sequence equality.
 */
function createSequenceComparatorOperator(sourceObservable, comparator) {
  // Default comparator: strict equality
  if (comparator === undefined) {
    comparator = function (a, b) {
      return a === b;
    };
  }

  return Pk9.operate(function (subscriber, destinationSubscriber) {
    // Buffers for each observable
    const bufferA = dMA();
    const bufferB = dMA();

    /**
     * Emits the result and completes the destination subscriber
     * @param {boolean} result
     */
    const emitResultAndComplete = function (result) {
      destinationSubscriber.next(result);
      destinationSubscriber.complete();
    };

    /**
     * Subscribes to an observable and processes its emissions for comparison
     * @param {Object} currentBuffer - Buffer for the current observable
     * @param {Object} otherBuffer - Buffer for the other observable
     * @returns {Subscription}
     */
    const createComparisonSubscriber = function (currentBuffer, otherBuffer) {
      const operatorSubscriber = Sk9.createOperatorSubscriber(
        destinationSubscriber,
        function (value) {
          // Destructure buffer and completion status
          const { buffer, complete } = otherBuffer;
          if (buffer.length === 0) {
            // If the other buffer is empty, store the value for later comparison
            currentBuffer.buffer.push(value);
          } else {
            // Compare the current value with the next value from the other buffer
            const otherValue = buffer.shift();
            if (!comparator(value, otherValue)) {
              // If values do not match, emit false and complete
              emitResultAndComplete(false);
            }
          }
        },
        function () {
          // Mark this buffer as complete
          currentBuffer.complete = true;
          const { complete, buffer } = otherBuffer;
          // If both buffers are complete, emit true if both are empty (all values matched)
          if (complete) {
            emitResultAndComplete(buffer.length === 0);
          }
          // Unsubscribe from this operator
          if (operatorSubscriber != null) {
            operatorSubscriber.unsubscribe();
          }
        }
      );
      return operatorSubscriber;
    };

    // Subscribe to both observables with their respective buffers
    subscriber.subscribe(createComparisonSubscriber(bufferA, bufferB));
    _k9.innerFrom(sourceObservable).subscribe(createComparisonSubscriber(bufferB, bufferA));
  });
}

module.exports = createSequenceComparatorOperator;