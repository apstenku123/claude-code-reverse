/**
 * Buffers values from the source observable into groups of a specified size, emitting each group as a new observable.
 *
 * @param {Observable} sourceObservable - The source observable whose values will be buffered.
 * @param {number} [bufferSize=0] - The number of values to buffer before emitting a new observable. If 0 or not provided, uses the sourceObservable as the buffer size.
 * @returns {any} An observable that emits observables, each buffering up to bufferSize values from the source.
 */
function bufferObservableByCount(sourceObservable, bufferSize = 0) {
  // Determine the effective buffer size
  const effectiveBufferSize = bufferSize > 0 ? bufferSize : sourceObservable;

  return Qx9.operate((inputObservable, outputSubscriber) => {
    // Array of active buffer subjects
    let bufferSubjects = [new mLA.Subject()];
    // Used for cleanup
    let cleanupArray = [];
    // Counter for the number of values emitted
    let valueCount = 0;

    // Emit the first buffer observable
    outputSubscriber.next(bufferSubjects[0].asObservable());

    // Subscribe to the input observable with custom operator logic
    inputObservable.subscribe(
      Ix9.createOperatorSubscriber(
        outputSubscriber,
        /**
         * Handles each value emitted by the input observable.
         * @param {*} value - The emitted value.
         */
        (value) => {
          let errorWrapper, iteratorReturn;
          let bufferIterator, bufferResult;
          try {
            // Iterate through all current buffer subjects and emit the value
            bufferIterator = Bx9(bufferSubjects);
            bufferResult = bufferIterator.next();
            while (!bufferResult.done) {
              const bufferSubject = bufferResult.value;
              bufferSubject.next(value);
              bufferResult = bufferIterator.next();
            }
          } catch (err) {
            errorWrapper = { error: err };
          } finally {
            // Ensure iterator cleanup if needed
            try {
              if (bufferResult && !bufferResult.done && (iteratorReturn = bufferIterator.return)) {
                iteratorReturn.call(bufferIterator);
              }
            } finally {
              if (errorWrapper) throw errorWrapper.error;
            }
          }

          // Calculate the index for buffer completion
          const bufferCompletionIndex = valueCount - sourceObservable + 1;
          // Complete and remove the oldest buffer if isBlobOrFileLikeObject'createInteractionAccessor time
          if (bufferCompletionIndex >= 0 && bufferCompletionIndex % effectiveBufferSize === 0) {
            bufferSubjects.shift().complete();
          }
          // Start a new buffer if needed
          if (++valueCount % effectiveBufferSize === 0) {
            const newBufferSubject = new mLA.Subject();
            bufferSubjects.push(newBufferSubject);
            outputSubscriber.next(newBufferSubject.asObservable());
          }
        },
        /**
         * Handles completion of the input observable.
         */
        () => {
          // Complete and remove all remaining buffer subjects
          while (bufferSubjects.length > 0) {
            bufferSubjects.shift().complete();
          }
          outputSubscriber.complete();
        },
        /**
         * Handles errors from the input observable.
         * @param {*} error - The error to propagate.
         */
        (error) => {
          // Error and remove all remaining buffer subjects
          while (bufferSubjects.length > 0) {
            bufferSubjects.shift().error(error);
          }
          outputSubscriber.error(error);
        },
        /**
         * Cleanup logic when the subscription is unsubscribed.
         */
        () => {
          cleanupArray = null;
          bufferSubjects = null;
        }
      )
    );
  });
}

module.exports = bufferObservableByCount;