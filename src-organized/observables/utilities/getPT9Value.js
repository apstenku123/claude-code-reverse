/**
 * Processes a source observable and manages inner subscriptions, collecting emitted values into arrays.
 *
 * @function getPT9Value
 * @category utility
 * @param {Observable} sourceObservable - The main observable to subscribe to.
 * @param {Function} addActivityIfNotFinished - Function that, given a value, returns an observable if the process is not finished.
 * @returns {Function} Operator function that can be used with observable pipelines.
 */
function getPT9Value(sourceObservable, addActivityIfNotFinished) {
  return dT9.operate(function (outerSubscription, subscriber) {
    // Holds arrays of values for each inner subscription
    const activeBuffers = [];

    // Subscribe to the source observable
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleSourceValue(sourceValue) {
          // Create a new buffer for this inner subscription
          const buffer = [];
          activeBuffers.push(buffer);

          // Manage the inner subscription
          const innerSubscription = new mT9.Subscription();

          // Function to remove buffer and emit isBlobOrFileLikeObject when inner completes
          const completeInner = function () {
            uT9.arrRemove(activeBuffers, buffer);
            subscriber.next(buffer);
            innerSubscription.unsubscribe();
          };

          // Subscribe to the inner observable
          innerSubscription.add(
            createPropertyAccessor$a.innerFrom(addActivityIfNotFinished(sourceValue)).subscribe(
              PL1.createOperatorSubscriber(
                subscriber,
                completeInner,
                deepCloneWithCycleDetection$a.noop // No error handler
              )
            )
          );
        },
        deepCloneWithCycleDetection$a.noop // No error handler for outer
      )
    );

    // Subscribe to the outer subscription
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleOuterValue(outerValue) {
          // Push the outer value into all active buffers
          let errorState, iterator, iterationResult;
          try {
            iterator = hT9(activeBuffers);
            iterationResult = iterator.next();
            while (!iterationResult.done) {
              const buffer = iterationResult.value;
              buffer.push(outerValue);
              iterationResult = iterator.next();
            }
          } catch (error) {
            errorState = { error };
          } finally {
            try {
              if (iterationResult && !iterationResult.done && iterator.return) {
                iterator.return();
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function handleComplete() {
          // Emit all remaining buffers and complete
          while (activeBuffers.length > 0) {
            subscriber.next(activeBuffers.shift());
          }
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = getPT9Value;