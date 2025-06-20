/**
 * Compares two observables by buffering their emitted values and checking for equality using a comparator function.
 * Emits `true` if all values match according to the comparator, otherwise emits `false` and completes early.
 *
 * @param {Observable} sourceObservable - The observable to compare against the main stream.
 * @param {Function} [comparator] - Optional. a function to compare values from the two observables. Defaults to strict equality.
 * @returns {Observable} An observable that emits a single boolean indicating whether the two streams matched.
 */
function compareObservablesWithBuffer(sourceObservable, comparator) {
  // Default comparator: strict equality
  if (comparator === undefined) {
    comparator = function (a, b) {
      return a === b;
    };
  }

  return Pk9.operate(function (mainSubscriber, destinationSubscriber) {
    // Buffers for each observable
    const mainBuffer = dMA();
    const sourceBuffer = dMA();

    /**
     * Emits the result and completes the destination subscriber.
     * @param {boolean} result
     */
    const emitResultAndComplete = function (result) {
      destinationSubscriber.next(result);
      destinationSubscriber.complete();
    };

    /**
     * Creates an operator subscriber for comparing buffered values.
     * @param {Object} ownBuffer - The buffer for this observable.
     * @param {Object} otherBuffer - The buffer for the other observable.
     * @returns {Subscription}
     */
    const createComparisonSubscriber = function (ownBuffer, otherBuffer) {
      const operatorSubscriber = Sk9.createOperatorSubscriber(
        destinationSubscriber,
        function (value) {
          // Destructure buffer and completion state
          const { buffer, complete } = otherBuffer;

          if (buffer.length === 0) {
            // If the other buffer is empty, store the value for later comparison
            ownBuffer.buffer.push(value);
          } else {
            // Compare the current value with the oldest value from the other buffer
            const otherValue = buffer.shift();
            if (!comparator(value, otherValue)) {
              // If values do not match, emit false and complete
              emitResultAndComplete(false);
            }
          }
        },
        function () {
          // Mark this buffer as complete
          ownBuffer.complete = true;
          const { complete, buffer } = otherBuffer;
          // If both streams are complete and all buffered values have been compared, emit true
          if (complete) {
            emitResultAndComplete(buffer.length === 0);
          }
          // Unsubscribe this operator
          operatorSubscriber && operatorSubscriber.unsubscribe();
        }
      );
      return operatorSubscriber;
    };

    // Subscribe to both observables with their respective buffers
    mainSubscriber.subscribe(createComparisonSubscriber(mainBuffer, sourceBuffer));
    _k9.innerFrom(sourceObservable).subscribe(createComparisonSubscriber(sourceBuffer, mainBuffer));
  });
}

module.exports = compareObservablesWithBuffer;