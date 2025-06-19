/**
 * Creates an RxJS operator that accumulates values from the source Observable using a provided accumulator function.
 * Optionally emits each accumulated value and handles completion logic.
 *
 * @param {Function} accumulatorFn - Function to accumulate values (accumulator, currentValue, index) => newAccumulator
 * @param {*} initialAccumulator - The initial value for the accumulator
 * @param {boolean} hasSeed - Whether an initial accumulator value is provided
 * @param {boolean} emitOnNext - Whether to emit the accumulated value on each next notification
 * @param {boolean} emitOnComplete - Whether to emit the last accumulated value and complete when the source completes
 * @returns {Function} Operator function to be used with an Observable
 */
function createAccumulatingOperator(accumulatorFn, initialAccumulator, hasSeed, emitOnNext, emitOnComplete) {
  return function (sourceObservable, subscriber) {
    let accumulator = initialAccumulator;
    let hasAccumulator = hasSeed;
    let index = 0;

    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      oT9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          const currentIndex = index++;
          // If hasSeed is true, accumulate; otherwise, set the first value as the accumulator
          if (hasAccumulator) {
            accumulator = accumulatorFn(accumulator, value, currentIndex);
          } else {
            accumulator = value;
            hasAccumulator = true;
          }
          // Emit the accumulated value if emitOnNext is true
          if (emitOnNext) {
            subscriber.next(accumulator);
          }
        },
        emitOnComplete && function handleComplete() {
          // On completion, emit the last accumulated value if any, then complete
          if (hasAccumulator) {
            subscriber.next(accumulator);
          }
          subscriber.complete();
        }
      )
    );
  };
}

module.exports = createAccumulatingOperator;