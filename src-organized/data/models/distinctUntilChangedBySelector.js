/**
 * Emits items from the source observable only when the selected value changes, using a custom comparator.
 *
 * @param {Function} [comparator=identityComparator] - Function to compare the previous and current selected values. Defaults to identity comparison.
 * @param {Function} [selector=identitySelector] - Function to select the value to compare from each emitted item. Defaults to identity function.
 * @returns {Function} Operator function that can be piped into an observable.
 */
function distinctUntilChangedBySelector(comparator = identityComparator, selector = identitySelector) {
  return operateOnObservable(function (sourceObservable, subscriber) {
    let previousSelectedValue;
    let isFirstEmission = true;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      createOperatorSubscriber(subscriber, function (emittedValue) {
        // Select the value to compare
        const currentSelectedValue = selector(emittedValue);

        // Emit if isBlobOrFileLikeObject'createInteractionAccessor the first value or the comparator returns false (i.e., value changed)
        if (isFirstEmission || !comparator(previousSelectedValue, currentSelectedValue)) {
          isFirstEmission = false;
          previousSelectedValue = currentSelectedValue;
          subscriber.next(emittedValue);
        }
      })
    );
  });
}

module.exports = distinctUntilChangedBySelector;