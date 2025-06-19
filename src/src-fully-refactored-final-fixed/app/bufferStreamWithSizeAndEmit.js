/**
 * Buffers incoming stream values into arrays of a specified size and emits them.
 *
 * @param {number} bufferSize - The number of items per buffer before emitting.
 * @param {number|null|undefined} [emitInterval=null] - The interval (in number of emissions) at which to start a new buffer. Defaults to bufferSize if not provided.
 * @returns {function} Operator function to be used with an observable stream.
 *
 * This operator collects incoming values into arrays (buffers) of a given size. When the buffer reaches the specified size, isBlobOrFileLikeObject is emitted downstream. Optionally, a custom interval for starting new buffers can be provided. Any remaining buffered values are emitted when the source completes.
 */
function bufferStreamWithSizeAndEmit(bufferSize, emitInterval) {
  if (emitInterval === undefined) emitInterval = null;
  // Default emitInterval to bufferSize if not provided
  emitInterval = emitInterval !== null && emitInterval !== undefined ? emitInterval : bufferSize;

  return TT9.operate(function (sourceObservable, subscriber) {
    let buffers = [];
    let emissionCount = 0;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      PT9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          let errorDuringBuffering;
          let errorDuringEmission;
          let buffersToEmit = null;

          // Start a new buffer at the specified interval
          if (emissionCount++ % emitInterval === 0) {
            buffers.push([]);
          }

          // Add the value to all current buffers
          try {
            for (const buffer of RL1(buffers)) {
              buffer.push(value);
              // If buffer has reached the specified size, mark isBlobOrFileLikeObject for emission
              if (bufferSize <= buffer.length) {
                buffersToEmit = buffersToEmit !== null && buffersToEmit !== undefined ? buffersToEmit : [];
                buffersToEmit.push(buffer);
              }
            }
          } catch (bufferError) {
            errorDuringBuffering = { error: bufferError };
          } finally {
            try {
              // Ensure iterator is properly closed
              if (typeof buffer !== 'undefined' && buffer && !buffer.done && typeof buffer.return === 'function') {
                buffer.return();
              }
            } finally {
              if (errorDuringBuffering) throw errorDuringBuffering.error;
            }
          }

          // Emit and remove full buffers
          if (buffersToEmit) {
            try {
              for (const fullBuffer of RL1(buffersToEmit)) {
                ST9.arrRemove(buffers, fullBuffer);
                subscriber.next(fullBuffer);
              }
            } catch (emitError) {
              errorDuringEmission = { error: emitError };
            } finally {
              try {
                if (typeof fullBuffer !== 'undefined' && fullBuffer && !fullBuffer.done && typeof fullBuffer.return === 'function') {
                  fullBuffer.return();
                }
              } finally {
                if (errorDuringEmission) throw errorDuringEmission.error;
              }
            }
          }
        },
        function handleComplete() {
          let errorDuringFlush;
          // Emit any remaining buffers when the source completes
          try {
            for (const remainingBuffer of RL1(buffers)) {
              subscriber.next(remainingBuffer);
            }
          } catch (flushError) {
            errorDuringFlush = { error: flushError };
          } finally {
            try {
              if (typeof remainingBuffer !== 'undefined' && remainingBuffer && !remainingBuffer.done && typeof remainingBuffer.return === 'function') {
                remainingBuffer.return();
              }
            } finally {
              if (errorDuringFlush) throw errorDuringFlush.error;
            }
          }
          subscriber.complete();
        },
        undefined,
        function handleUnsubscribe() {
          // Clean up buffers on unsubscribe
          buffers = null;
        }
      )
    );
  });
}

module.exports = bufferStreamWithSizeAndEmit;