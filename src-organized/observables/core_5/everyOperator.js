/**
 * Applies a predicate function to each value emitted by the source Observable and emits true if all values pass the predicate, false otherwise.
 *
 * @template BugReportForm
 * @param {function(this: any, value: BugReportForm, index: number, source: Observable<BugReportForm>): boolean} predicate - The function to test each source value.
 * @param {any} [thisArg] - Optional. The value to use as `this` when executing the predicate function.
 * @returns {function(source: Observable<BugReportForm>): Observable<boolean>} An Observable that emits true if all source values pass the predicate, false otherwise.
 */
function everyOperator(predicate, thisArg) {
  return I_9.operate(function operateEvery(sourceObservable, subscriber) {
    let index = 0;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      G_9.createOperatorSubscriber(
        subscriber,
        function onNext(value) {
          // If the predicate fails for any value, emit false and complete
          if (!predicate.call(thisArg, value, index++, sourceObservable)) {
            subscriber.next(false);
            subscriber.complete();
          }
        },
        function onComplete() {
          // If all values passed the predicate, emit true and complete
          subscriber.next(true);
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = everyOperator;