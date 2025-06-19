/**
 * Creates an RxJS operator that maps each emission from the source Observable to an inner Observable,
 * optionally applying a result selector function to combine outer and inner values.
 *
 * @param {function(any, number): Observable<any>} mapToInnerObservable - Function that receives each value from the source Observable and its index, returning an inner Observable.
 * @param {function(any, any, number, number): any} [resultSelector] - Optional function to combine the outer value, inner value, outer index, and inner index into a result value.
 * @returns {function(Observable<any>): Observable<any>} An RxJS operator function.
 */
function createMappedInnerObservableOperator(mapToInnerObservable, resultSelector) {
  if (resultSelector) {
    // If a resultSelector is provided, return an operator that maps outer and inner values using the selector
    return function (sourceObservable) {
      return sourceObservable.pipe(
        createMappedInnerObservableOperator(function (outerValue, outerIndex) {
          // Map each outer value to an inner Observable
          return EqA.innerFrom(mapToInnerObservable(outerValue, outerIndex)).pipe(
            D_9.map(function (innerValue, innerIndex) {
              // Combine outer and inner values using the resultSelector
              return resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            })
          );
        })
      );
    };
  }

  // If no resultSelector is provided, return a custom RxJS operator
  return Y_9.operate(function (sourceObservable, subscriber) {
    let outerIndex = 0;
    let innerSubscriber = null;
    let isComplete = false;

    // Subscribe to the source Observable
    sourceObservable.subscribe(
      UqA.createOperatorSubscriber(
        subscriber,
        function (outerValue) {
          // For each value from the source, subscribe to the inner Observable
          if (!innerSubscriber) {
            innerSubscriber = UqA.createOperatorSubscriber(
              subscriber,
              undefined,
              function () {
                // When the inner Observable completes, clean up
                innerSubscriber = null;
                if (isComplete) {
                  subscriber.complete();
                }
              }
            );
            EqA.innerFrom(mapToInnerObservable(outerValue, outerIndex++)).subscribe(innerSubscriber);
          }
        },
        function () {
          // When the source completes, complete if there is no active inner subscriber
          isComplete = true;
          if (!innerSubscriber) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = createMappedInnerObservableOperator;