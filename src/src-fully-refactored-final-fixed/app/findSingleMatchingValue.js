/**
 * Emits the single value from the source Observable that matches the provided predicate.
 * Throws an error if no values match, or if more than one value matches.
 *
 * @template BugReportForm
 * @param {function(value: BugReportForm, index: number, source: Observable<BugReportForm>): boolean} [predicate] - Optional function to test each source value.
 * @returns {function(sourceObservable: Observable<BugReportForm>): Observable<BugReportForm>} Operator function that emits the single matching value or errors.
 */
function findSingleMatchingValue(predicate) {
  return pk9.operate(function (sourceObservable, subscriber) {
    let hasMatch = false; // Tracks if a matching value has been found
    let matchingValue;    // Stores the matching value
    let hasAnyValue = false; // Tracks if any value has been emitted by the source
    let index = 0;        // Index of the current value

    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      ck9.createOperatorSubscriber(
        subscriber,
        function (value) {
          hasAnyValue = true;
          // If no predicate is provided, or the predicate returns true for this value
          if (!predicate || predicate(value, index++, sourceObservable)) {
            // If a matching value was already found, error (more than one match)
            if (hasMatch) {
              subscriber.error(new dk9.SequenceError("Too many matching values"));
              return;
            }
            hasMatch = true;
            matchingValue = value;
          }
        },
        function () {
          // On completion, emit the matching value if found, else error
          if (hasMatch) {
            subscriber.next(matchingValue);
            subscriber.complete();
          } else {
            // If at least one value was emitted, but none matched, throw NotFoundError
            // If no values were emitted at all, throw EmptyError
            subscriber.error(
              hasAnyValue
                ? new uk9.NotFoundError("No matching values")
                : new mk9.EmptyError()
            );
          }
        }
      )
    );
  });
}

module.exports = findSingleMatchingValue;