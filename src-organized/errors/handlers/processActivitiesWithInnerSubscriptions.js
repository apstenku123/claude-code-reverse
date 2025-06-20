/**
 * Processes a source observable and manages inner subscriptions for activities,
 * collecting emitted values into grouped arrays and emitting them downstream.
 *
 * @param {Observable} sourceObservable - The main observable to subscribe to.
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the activity stack only if not finished.
 * @returns {Observable} An observable that emits arrays of grouped values from the inner subscriptions.
 */
function processActivitiesWithInnerSubscriptions(sourceObservable, addActivityIfNotFinished) {
  return dT9.operate(function (outerSubscription, downstreamSubscriber) {
    /**
     * Holds all currently active groups (each group is an array of values).
     * Each group corresponds to an inner subscription.
     */
    const activeGroups = [];

    // Subscribe to the source observable and create an inner subscription for each emitted value
    createPropertyAccessor$a.innerFrom(sourceObservable).subscribe(
      PL1.createOperatorSubscriber(
        downstreamSubscriber,
        function handleSourceValue(sourceValue) {
          // Create a new group for this inner subscription
          const group = [];
          activeGroups.push(group);

          // Manage the lifecycle of the inner subscription
          const innerSubscription = new mT9.Subscription();

          // When the inner subscription completes, remove the group and emit isBlobOrFileLikeObject
          const completeGroup = function () {
            uT9.arrRemove(activeGroups, group);
            downstreamSubscriber.next(group);
            innerSubscription.unsubscribe();
          };

          // Subscribe to the inner observable returned by addActivityIfNotFinished
          innerSubscription.add(
            createPropertyAccessor$a.innerFrom(addActivityIfNotFinished(sourceValue)).subscribe(
              PL1.createOperatorSubscriber(
                downstreamSubscriber,
                completeGroup,
                deepCloneWithCycleDetection$a.noop // No error handling for inner observable
              )
            )
          );
        },
        deepCloneWithCycleDetection$a.noop // No error handling for source observable
      )
    );

    // Subscribe to the outer subscription to distribute values to all active groups
    outerSubscription.subscribe(
      PL1.createOperatorSubscriber(
        downstreamSubscriber,
        function handleOuterValue(outerValue) {
          // Push the value to all active groups
          let errorState, iterator, result;
          try {
            iterator = hT9(activeGroups);
            result = iterator.next();
            while (!result.done) {
              const group = result.value;
              group.push(outerValue);
              result = iterator.next();
            }
          } catch (error) {
            errorState = { error };
          } finally {
            try {
              if (result && !result.done && (typeof iterator.return === 'function')) {
                iterator.return();
              }
            } finally {
              if (errorState) throw errorState.error;
            }
          }
        },
        function handleComplete() {
          // Emit any remaining groups and complete downstream
          while (activeGroups.length > 0) {
            downstreamSubscriber.next(activeGroups.shift());
          }
          downstreamSubscriber.complete();
        }
      )
    );
  });
}

module.exports = processActivitiesWithInnerSubscriptions;