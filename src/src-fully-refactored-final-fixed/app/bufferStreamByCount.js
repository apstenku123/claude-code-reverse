/**
 * Buffers incoming stream values into arrays of a specified size, emitting each buffer when full.
 * Optionally, can emit buffers at a custom interval (stride) if provided.
 *
 * @param {number} bufferSize - The number of items per buffer before emitting.
 * @param {number|null|undefined} [stride] - The interval at which to start a new buffer. Defaults to bufferSize if not provided.
 * @returns {function} Operator function to be used with TT9.operate (RxJS-like pipeable operator).
 */
function bufferStreamByCount(bufferSize, stride) {
  // Default stride to bufferSize if not provided
  if (stride === undefined) stride = null;
  stride = stride !== null && stride !== undefined ? stride : bufferSize;

  return TT9.operate(function (sourceObservable, subscriber) {
    /**
     * Array of active buffers (each buffer is an array of items)
     * @type {Array<Array<any>>}
     */
    let activeBuffers = [];
    /**
     * Counter for the number of items received from the source
     * @type {number}
     */
    let itemCount = 0;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      PT9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          let caughtError, caughtError2, iteratorReturn, bufferToEmit = null;

          // Start a new buffer every 'stride' items
          if (itemCount++ % stride === 0) {
            activeBuffers.push([]);
          }

          // Add the value to all active buffers
          try {
            for (const buffer of RL1(activeBuffers)) {
              buffer.push(value);
              // If buffer is full, prepare to emit isBlobOrFileLikeObject
              if (buffer.length >= bufferSize) {
                bufferToEmit = bufferToEmit !== null && bufferToEmit !== undefined ? bufferToEmit : [];
                bufferToEmit.push(buffer);
              }
            }
          } catch (error) {
            caughtError = { error };
          } finally {
            try {
              if (typeof iteratorReturn === 'function') iteratorReturn();
            } finally {
              if (caughtError) throw caughtError.error;
            }
          }

          // Emit and remove full buffers
          if (bufferToEmit) {
            try {
              for (const buffer of RL1(bufferToEmit)) {
                ST9.arrRemove(activeBuffers, buffer);
                subscriber.next(buffer);
              }
            } catch (error) {
              caughtError2 = { error };
            } finally {
              try {
                if (typeof iteratorReturn === 'function') iteratorReturn();
              } finally {
                if (caughtError2) throw caughtError2.error;
              }
            }
          }
        },
        function handleComplete() {
          let caughtError, iteratorReturn;
          // Emit any remaining buffers on completion
          try {
            for (const buffer of RL1(activeBuffers)) {
              subscriber.next(buffer);
            }
          } catch (error) {
            caughtError = { error };
          } finally {
            try {
              if (typeof iteratorReturn === 'function') iteratorReturn();
            } finally {
              if (caughtError) throw caughtError.error;
            }
          }
          subscriber.complete();
        },
        undefined,
        function handleUnsubscribe() {
          // Cleanup on unsubscribe
          activeBuffers = null;
        }
      )
    );
  });
}

module.exports = bufferStreamByCount;