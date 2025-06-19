/**
 * Applies an operator to an Observable that emits values until a predicate function returns false.
 * After the predicate returns false for the first time, all subsequent values are emitted without filtering.
 *
 * @template BugReportForm
 * @param {function(value: BugReportForm, index: number): boolean} predicate - a function to test each source value. Receives the value and its index.
 * @returns {function(sourceObservable: Observable<BugReportForm>): Observable<BugReportForm>} An operator function to be used with Observable.pipe().
 */
function filterUntilPredicateFailsOperator(predicate) {
  return Qy9.operate(function (sourceObservable, subscriber) {
    let predicatePassed = false; // Tracks if the predicate has failed at least once
    let index = 0; // Tracks the index of the current value
    sourceObservable.subscribe(
      Iy9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // If predicate has already failed, or fails now, emit the value
          if (predicatePassed || !(predicate(value, index++))) {
            predicatePassed = true;
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = filterUntilPredicateFailsOperator;