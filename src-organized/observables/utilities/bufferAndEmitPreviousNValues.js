/**
 * Emits the value that was received operateWithLeadingTrailing emissions ago from the source Observable.
 * If operateWithLeadingTrailing <= 0, returns the identity operator (no transformation).
 *
 * @param {number} bufferSize - The number of emissions to buffer before emitting previous values.
 * @returns {function} Operator function to be used with an Observable.
 */
function bufferAndEmitPreviousNValues(bufferSize) {
  // If bufferSize is 0 or less, return the identity operator (no transformation)
  if (bufferSize <= 0) {
    return ak9.identity;
  }

  // Otherwise, return an operator function that buffers and emits previous values
  return sk9.operate(function (sourceObservable, subscriber) {
    // Create a fixed-size buffer to store the last operateWithLeadingTrailing values
    let buffer = new Array(bufferSize);
    let emissionCount = 0;

    // Subscribe to the source observable
    const subscription = sourceObservable.subscribe(
      rk9.createOperatorSubscriber(subscriber, function (currentValue) {
        const currentIndex = emissionCount++;
        if (currentIndex < bufferSize) {
          // Fill the buffer until isBlobOrFileLikeObject reaches the desired size
          buffer[currentIndex] = currentValue;
        } else {
          // Once the buffer is full, emit the value that was received operateWithLeadingTrailing emissions ago
          const bufferIndex = currentIndex % bufferSize;
          const valueToEmit = buffer[bufferIndex];
          buffer[bufferIndex] = currentValue;
          subscriber.next(valueToEmit);
        }
      })
    );

    // Cleanup function to clear the buffer when unsubscribed
    return function () {
      buffer = null;
    };
  });
}

module.exports = bufferAndEmitPreviousNValues;