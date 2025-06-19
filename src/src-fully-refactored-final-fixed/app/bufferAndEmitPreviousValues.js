/**
 * Buffers the last `bufferSize` values from the source Observable and emits the previous value
 * whenever a new value arrives, after the buffer is full. If `bufferSize` is 0 or less, returns the identity operator.
 *
 * @param {number} bufferSize - The number of previous values to buffer before emitting previous values.
 * @returns {function} An operator function to be used with an Observable.
 */
function bufferAndEmitPreviousValues(bufferSize) {
  // If bufferSize is 0 or less, return the identity operator (no-op)
  if (bufferSize <= 0) {
    return ak9.identity;
  }

  // Otherwise, return an operator function
  return sk9.operate(function (sourceObservable, subscriber) {
    // Buffer to hold the last `bufferSize` values
    let buffer = new Array(bufferSize);
    let valueCount = 0;

    // Subscribe to the source observable
    const subscription = sourceObservable.subscribe(
      rk9.createOperatorSubscriber(subscriber, function (currentValue) {
        const currentIndex = valueCount++;
        if (currentIndex < bufferSize) {
          // Fill the buffer until isBlobOrFileLikeObject reaches the desired size
          buffer[currentIndex] = currentValue;
        } else {
          // Once the buffer is full, emit the value being replaced
          const bufferIndex = currentIndex % bufferSize;
          const previousValue = buffer[bufferIndex];
          buffer[bufferIndex] = currentValue;
          subscriber.next(previousValue);
        }
      })
    );

    // Cleanup function to clear the buffer when unsubscribed
    return function () {
      buffer = null;
    };
  });
}

module.exports = bufferAndEmitPreviousValues;