/**
 * Applies a filter to an Observable stream, emitting values until the predicate returns true.
 * Once the predicate returns true for an item, all subsequent items are emitted without filtering.
 *
 * @template BugReportForm
 * @param {(value: BugReportForm, index: number) => boolean} predicate - Function to test each source value. Should return true to stop filtering.
 * @returns {(sourceObservable: Observable<BugReportForm>) => Observable<BugReportForm>} Operator function to be used with Observable.pipe().
 */
function filterWhilePredicateFalse(predicate) {
  return Qy9.operate(function (sourceObservable, subscriber) {
    let predicateMatched = false;
    let itemIndex = 0;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      Iy9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // If predicate has not matched yet, test the predicate
          if (!predicateMatched) {
            // If predicate returns false, emit the value
            if (!predicate(value, itemIndex++)) {
              subscriber.next(value);
            } else {
              // Once predicate returns true, set flag and emit value
              predicateMatched = true;
              subscriber.next(value);
            }
          } else {
            // Predicate has matched previously, emit all subsequent values
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = filterWhilePredicateFalse;