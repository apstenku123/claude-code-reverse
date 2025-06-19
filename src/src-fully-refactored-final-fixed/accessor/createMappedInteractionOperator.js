/**
 * Creates an RxJS operator that maps each emission from the source observable to a new inner observable,
 * processes its values, and emits the results downstream. Optionally applies a result selector function.
 *
 * @param {function(any, number): Observable} processInteractionEntries - Function that takes a value and its index from the source observable and returns an inner observable.
 * @param {function(any, any, number, number): any} [resultSelector] - Optional function to map the source value, inner value, outer index, and inner index to a result value.
 * @returns {function(Observable): Observable} - An RxJS operator function.
 */
function createMappedInteractionOperator(processInteractionEntries, resultSelector) {
  return Fy9.operate((sourceObservable, subscriber) => {
    let activeInnerSubscription = null;
    let outerIndex = 0;
    let isSourceComplete = false;

    /**
     * Checks if the source is complete and there is no active inner subscription.
     * If so, completes the downstream subscriber.
     */
    const checkComplete = () => {
      if (isSourceComplete && !activeInnerSubscription) {
        subscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      WLA.createOperatorSubscriber(
        subscriber,
        (outerValue) => {
          // Unsubscribe from any previous inner observable
          if (activeInnerSubscription !== null && activeInnerSubscription !== undefined) {
            activeInnerSubscription.unsubscribe();
          }

          let innerIndex = 0;
          const currentOuterIndex = outerIndex++;

          // Subscribe to the new inner observable returned by processInteractionEntries
          Wy9.innerFrom(processInteractionEntries(outerValue, currentOuterIndex)).subscribe(
            activeInnerSubscription = WLA.createOperatorSubscriber(
              subscriber,
              (innerValue) => {
                // Emit the mapped value using resultSelector if provided, else emit the inner value
                if (resultSelector) {
                  subscriber.next(resultSelector(outerValue, innerValue, currentOuterIndex, innerIndex++));
                } else {
                  subscriber.next(innerValue);
                  innerIndex++;
                }
              },
              () => {
                // When the inner observable completes, clear the reference and check for completion
                activeInnerSubscription = null;
                checkComplete();
              }
            )
          );
        },
        () => {
          // When the source completes, set the flag and check for completion
          isSourceComplete = true;
          checkComplete();
        }
      )
    );
  });
}

module.exports = createMappedInteractionOperator;