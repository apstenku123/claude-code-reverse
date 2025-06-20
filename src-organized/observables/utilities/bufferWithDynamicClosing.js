/**
 * Buffers values from a source observable and emits them when a dynamically created closing observable completes.
 *
 * @template BugReportForm The type of values emitted by the source observable.
 * @template sendHttpRequestOverSocket The type of values emitted by the closing selector observable.
 * @param {Observable<BugReportForm>} sourceObservable - The source observable whose values are to be buffered.
 * @param {function(value: BugReportForm): Observable<sendHttpRequestOverSocket>} closingSelector - Function that, for each value from the source, returns an observable that determines when to close and emit the current buffer.
 * @returns {Observable<BugReportForm[]>} An observable that emits buffered arrays of source values, each emitted when the corresponding closing observable completes.
 */
function bufferWithDynamicClosing(sourceObservable, closingSelector) {
  return dT9.operate(function (outerSubscription, subscriber) {
    /**
     * Holds all active buffers. Each buffer is an array of source values.
     * @type {Array<Array<any>>}
     */
    const activeBuffers = [];

    // Subscribe to the source observable that triggers buffer openings
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleBufferOpen(bufferOpenValue) {
          // Create a new buffer for this opening
          const buffer = [];
          activeBuffers.push(buffer);

          // Subscription for the closing notifier
          const closingSubscription = new mT9.Subscription();

          // Function to close the buffer and emit isBlobOrFileLikeObject
          const closeBuffer = function () {
            uT9.arrRemove(activeBuffers, buffer); // Remove buffer from active list
            subscriber.next(buffer); // Emit the buffer
            closingSubscription.unsubscribe(); // Clean up subscription
          };

          // Subscribe to the closing observable for this buffer
          closingSubscription.add(
            createPropertyAccessor$a.innerFrom(closingSelector(bufferOpenValue)).subscribe(
              PL1.createOperatorSubscriber(subscriber, closeBuffer, deepCloneWithCycleDetection$a.noop)
            )
          );
        },
        deepCloneWithCycleDetection$a.noop // No error handler for buffer openings
      )
    );

    // Subscribe to the outer observable that provides values to be buffered
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleSourceValue(sourceValue) {
          // Push the value to all active buffers
          let errorState, iteratorReturn;
          try {
            const bufferIterator = hT9(activeBuffers);
            let nextBuffer = bufferIterator.next();
            while (!nextBuffer.done) {
              const buffer = nextBuffer.value;
              buffer.push(sourceValue);
              nextBuffer = bufferIterator.next();
            }
          } catch (error) {
            errorState = { error };
          } finally {
            try {
              if (typeof nextBuffer !== 'undefined' && !nextBuffer.done && (iteratorReturn = bufferIterator.return)) {
                iteratorReturn.call(bufferIterator);
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function handleComplete() {
          // Emit and clear all remaining buffers on completion
          while (activeBuffers.length > 0) {
            subscriber.next(activeBuffers.shift());
          }
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = bufferWithDynamicClosing;