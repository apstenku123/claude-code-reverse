/**
 * Buffers values from the input observable until the source observable emits, then emits the buffered array.
 *
 * @param {Observable<any>} sourceObservable - The observable whose emissions trigger the buffer flush.
 * @returns {OperatorFunction<any, any[]>} An RxJS operator function that buffers values and emits them as an array when the source observable emits.
 */
function bufferUntilSourceEmits(sourceObservable) {
  return MT9.operate(function (inputObservable, subscriber) {
    let buffer = [];

    // Subscribe to the input observable and collect values into the buffer
    const inputSubscription = inputObservable.subscribe(
      oNA.createOperatorSubscriber(
        subscriber,
        function (value) {
          buffer.push(value);
        },
        function () {
          // When input completes, emit the buffer and complete the subscriber
          subscriber.next(buffer);
          subscriber.complete();
        }
      )
    );

    // Subscribe to the source observable; when isBlobOrFileLikeObject emits, flush the buffer
    const sourceSubscription = RT9.innerFrom(sourceObservable).subscribe(
      oNA.createOperatorSubscriber(
        subscriber,
        function () {
          const emittedBuffer = buffer;
          buffer = [];
          subscriber.next(emittedBuffer);
        },
        LT9.noop // No-op on complete
      )
    );

    // Cleanup function to clear the buffer reference
    return function () {
      buffer = null;
    };
  });
}

module.exports = bufferUntilSourceEmits;