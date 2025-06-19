/**
 * Applies a predicate function to each value emitted by the source Observable and emits true if all values satisfy the predicate, otherwise emits false and completes early.
 *
 * @template BugReportForm
 * @param {function(this: any, value: BugReportForm, index: number, source: Observable<BugReportForm>): boolean} predicate - The function to test each source value.
 * @param {any} [thisArg] - Optional context to bind as `this` in the predicate function.
 * @returns {function(source: Observable<BugReportForm>): Observable<boolean>} An operator function that returns an Observable emitting true if all items pass the predicate, false otherwise.
 */
function everyObservableOperator(predicate, thisArg) {
  return I_9.operate(function operateOnSource(sourceObservable, subscriber) {
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
          // If the source completes without predicate failure, emit true
          subscriber.next(true);
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = everyObservableOperator;