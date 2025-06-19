/**
 * Buffers items from a source observable and emits them when an inner observable completes.
 *
 * This operator subscribes to an outer observable (sourceObservable) and, for each value,
 * subscribes to an inner observable created from config(value). While the inner observable is active,
 * items from the source are buffered. When the inner observable completes, the buffer is emitted.
 *
 * @param {Observable} sourceObservable - The source observable to buffer items from.
 * @param {Function} config - a function that receives a value from the source and returns an inner observable.
 * @returns {Function} An operator function to be used with an observable pipeline.
 */
function bufferItemsWhileInnerActive(sourceObservable, config) {
  return dT9.operate(function (outerSubscription, subscriber) {
    /**
     * Array of active buffers. Each buffer is an array of items collected while its inner observable is active.
     * @type {Array<Array<any>>}
     */
    const activeBuffers = [];

    // Subscribe to the source observable and create an inner observable for each value
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleSourceValue(sourceValue) {
          // Create a new buffer for this inner observable
          const buffer = [];
          activeBuffers.push(buffer);

          // Subscription for the inner observable
          const innerSubscription = new mT9.Subscription();

          // When the inner observable completes, emit the buffer and clean up
          const onInnerComplete = function () {
            uT9.arrRemove(activeBuffers, buffer); // Remove buffer from active buffers
            subscriber.next(buffer); // Emit the buffer
            innerSubscription.unsubscribe(); // Clean up subscription
          };

          // Subscribe to the inner observable created from config(sourceValue)
          innerSubscription.add(
            createPropertyAccessor$a.innerFrom(config(sourceValue)).subscribe(
              PL1.createOperatorSubscriber(subscriber, onInnerComplete, deepCloneWithCycleDetection$a.noop)
            )
          );
        },
        deepCloneWithCycleDetection$a.noop // No error handler for the source observable
      )
    );

    // Subscribe to the outer observable to buffer incoming values
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        subscriber,
        function handleOuterValue(outerValue) {
          // Push the value to all active buffers
          let errorState, iterator;
          try {
            iterator = hT9(activeBuffers);
            let nextBuffer = iterator.next();
            while (!nextBuffer.done) {
              const buffer = nextBuffer.value;
              buffer.push(outerValue);
              nextBuffer = iterator.next();
            }
          } catch (error) {
            errorState = { error };
          } finally {
            try {
              if (iterator && !iterator.done && typeof iterator.return === 'function') {
                iterator.return();
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function handleComplete() {
          // Emit any remaining buffers and complete the subscriber
          while (activeBuffers.length > 0) {
            subscriber.next(activeBuffers.shift());
          }
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = bufferItemsWhileInnerActive;