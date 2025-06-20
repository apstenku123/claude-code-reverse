/**
 * Buffers values from a source observable into arrays, where each buffer is dynamically opened by the source
 * and closed by an inner observable created from a provided closingSelector function.
 *
 * @param {Observable} sourceObservable - The source observable whose values are to be buffered.
 * @param {Function} closingSelector - a function that, when called with a value from the source, returns an observable that closes the buffer.
 * @returns {Observable} An observable that emits buffered arrays of source values, closed by the inner observables.
 */
function bufferWithDynamicInnerObservable(sourceObservable, closingSelector) {
  return dT9.operate(function (outerSubscription, destinationSubscriber) {
    // Array to keep track of all active buffers
    const activeBuffers = [];

    // Subscribe to the source observable to open new buffers
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        destinationSubscriber,
        function (sourceValue) {
          // Create a new buffer for each source value
          const buffer = [];
          activeBuffers.push(buffer);

          // Subscription for the inner closing observable
          const closingSubscription = new mT9.Subscription();

          // Function to close the buffer and emit isBlobOrFileLikeObject
          const closeBuffer = function () {
            uT9.arrRemove(activeBuffers, buffer); // Remove buffer from active list
            destinationSubscriber.next(buffer); // Emit the buffer
            closingSubscription.unsubscribe(); // Clean up subscription
          };

          // Subscribe to the closing observable returned by closingSelector
          closingSubscription.add(
            createPropertyAccessor$a.innerFrom(closingSelector(sourceValue)).subscribe(
              PL1.createOperatorSubscriber(
                destinationSubscriber,
                closeBuffer,
                deepCloneWithCycleDetection$a.noop // No error handling for closing observable
              )
            )
          );
        },
        deepCloneWithCycleDetection$a.noop // No error handling for source observable
      )
    );

    // Subscribe to the outer subscription to fill all active buffers with new values
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        destinationSubscriber,
        function (outerValue) {
          // Push the value into all active buffers
          let errorState, iteratorReturn;
          try {
            // Use a custom iterator (hT9) over the active buffers
            const bufferIterator = hT9(activeBuffers);
            let iterationResult = bufferIterator.next();
            while (!iterationResult.done) {
              const buffer = iterationResult.value;
              buffer.push(outerValue);
              iterationResult = bufferIterator.next();
            }
          } catch (error) {
            errorState = { error };
          } finally {
            try {
              if (typeof iterationResult !== 'undefined' && !iterationResult.done && (iteratorReturn = bufferIterator.return)) {
                iteratorReturn.call(bufferIterator);
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function () {
          // On complete, emit all remaining buffers and complete the destination
          while (activeBuffers.length > 0) {
            destinationSubscriber.next(activeBuffers.shift());
          }
          destinationSubscriber.complete();
        }
      )
    );
  });
}

module.exports = bufferWithDynamicInnerObservable;