/**
 * Processes values from a source observable and applies a transformation function to each value.
 * Maintains a list of active inner arrays, pushing values from the source into each active array.
 * When an inner observable completes, isBlobOrFileLikeObject emits its collected array and removes isBlobOrFileLikeObject from the active list.
 *
 * @param {Observable} sourceObservable - The main observable whose values are distributed to active inner arrays.
 * @param {Function} transformFn - Function that, given a value from the source, returns an inner observable.
 * @returns {Observable} An observable emitting arrays of collected values as inner observables complete.
 */
function processPT9Values(sourceObservable, transformFn) {
  return dT9.operate(function (outerSubscription, observer) {
    // Holds all active arrays collecting values from the source
    const activeCollections = [];

    // Subscribe to the innerFrom of the source observable
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        observer,
        function (outerValue) {
          // For each value from the source, create a new collection array
          const currentCollection = [];
          activeCollections.push(currentCollection);

          // Subscription for the inner observable
          const innerSubscription = new mT9.Subscription();

          // Completion handler for the inner observable
          const completeInner = function () {
            // Remove the collection from active, emit isBlobOrFileLikeObject, and clean up
            uT9.arrRemove(activeCollections, currentCollection);
            observer.next(currentCollection);
            innerSubscription.unsubscribe();
          };

          // Subscribe to the inner observable returned by transformFn
          innerSubscription.add(
            createPropertyAccessor$a.innerFrom(transformFn(outerValue)).subscribe(
              PL1.createOperatorSubscriber(observer, completeInner, deepCloneWithCycleDetection$a.noop)
            )
          );
        },
        deepCloneWithCycleDetection$a.noop
      )
    );

    // Subscribe to the outer subscription (source observable)
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        observer,
        function (sourceValue) {
          // Push each source value into all active collections
          let errorState, iteratorReturn;
          try {
            const collectionsIterator = hT9(activeCollections);
            let nextCollection = collectionsIterator.next();
            while (!nextCollection.done) {
              const collection = nextCollection.value;
              collection.push(sourceValue);
              nextCollection = collectionsIterator.next();
            }
          } catch (err) {
            errorState = { error: err };
          } finally {
            try {
              if (typeof nextCollection !== 'undefined' && !nextCollection.done && (iteratorReturn = collectionsIterator.return)) {
                iteratorReturn.call(collectionsIterator);
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function () {
          // On completion, emit all remaining collections and complete
          while (activeCollections.length > 0) {
            observer.next(activeCollections.shift());
          }
          observer.complete();
        }
      )
    );
  });
}

module.exports = processPT9Values;