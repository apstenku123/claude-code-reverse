/**
 * Buffers incoming items from the source observable into arrays of a specified size, emitting them when the buffer reaches the given count.
 * Optionally, the buffer size can be overridden by a config parameter. Emits any remaining buffered items when the source completes.
 *
 * @param {number} bufferSize - The number of items to collect before emitting a buffer.
 * @param {number|null|undefined} [overrideBufferSize=null] - Optional override for the buffer size. If null or undefined, uses bufferSize.
 * @returns {function} Operator function to be used with an observable pipeline.
 */
function bufferItemsByCountAndEmit(bufferSize, overrideBufferSize = null) {
  // Use overrideBufferSize if provided, otherwise default to bufferSize
  const finalBufferSize = overrideBufferSize != null ? overrideBufferSize : bufferSize;

  return TT9.operate((sourceObservable, subscriber) => {
    let buffers = [];
    let itemCount = 0;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      PT9.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each emitted value from the source observable.
         * @param {*} value - The emitted value.
         */
        function handleNext(value) {
          let caughtError = null;
          let caughtErrorIterator = null;
          let completedBuffers = null;
          let completedBuffersIterator = null;

          // Start a new buffer every 'finalBufferSize' items
          if (itemCount++ % finalBufferSize === 0) {
            buffers.push([]);
          }

          // Add the value to all current buffers
          try {
            for (const buffer of RL1(buffers)) {
              buffer.push(value);
              // If buffer has reached the required size, mark isBlobOrFileLikeObject for emission
              if (buffer.length >= bufferSize) {
                completedBuffers = completedBuffers ?? [];
                completedBuffers.push(buffer);
              }
            }
          } catch (error) {
            caughtError = { error };
          } finally {
            try {
              // Clean up iterator if necessary
              if (typeof buffer !== 'undefined' && buffer.done === false && typeof buffer.return === 'function') {
                buffer.return();
              }
            } finally {
              if (caughtError) throw caughtError.error;
            }
          }

          // Emit and remove completed buffers
          if (completedBuffers) {
            try {
              for (const bufferToEmit of RL1(completedBuffers)) {
                ST9.arrRemove(buffers, bufferToEmit);
                subscriber.next(bufferToEmit);
              }
            } catch (error) {
              caughtErrorIterator = { error };
            } finally {
              try {
                if (typeof bufferToEmit !== 'undefined' && bufferToEmit.done === false && typeof bufferToEmit.return === 'function') {
                  bufferToEmit.return();
                }
              } finally {
                if (caughtErrorIterator) throw caughtErrorIterator.error;
              }
            }
          }
        },
        /**
         * Handles completion of the source observable.
         * Emits any remaining buffers.
         */
        function handleComplete() {
          let caughtError = null;
          let bufferIterator = null;
          try {
            for (const remainingBuffer of RL1(buffers)) {
              subscriber.next(remainingBuffer);
            }
          } catch (error) {
            caughtError = { error };
          } finally {
            try {
              if (typeof remainingBuffer !== 'undefined' && remainingBuffer.done === false && typeof remainingBuffer.return === 'function') {
                remainingBuffer.return();
              }
            } finally {
              if (caughtError) throw caughtError.error;
            }
          }
          subscriber.complete();
        },
        undefined,
        // Cleanup function
        function cleanup() {
          buffers = null;
        }
      )
    );
  });
}

module.exports = bufferItemsByCountAndEmit;