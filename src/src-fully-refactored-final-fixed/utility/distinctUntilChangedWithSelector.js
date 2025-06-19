/**
 * Emits items from the source observable only when the selected value changes, using a custom comparator.
 *
 * @param {function} [comparator=identity] - Function to compare the previous and current selected values. Defaults to identity comparison.
 * @param {function} [selector=identity] - Function to select the value to compare from each emitted item. Defaults to identity function.
 * @returns {function} Operator function to be used with observables.
 */
function distinctUntilChangedWithSelector(comparator = fS9.identity, selector = fS9.identity) {
  // Use default comparator if not provided
  const compareFn = comparator !== null && comparator !== undefined ? comparator : areValuesStrictlyEqual;

  // Return an operator function for the observable
  return vS9.operate(function (sourceObservable, subscriber) {
    let previousSelectedValue;
    let isFirstEmission = true;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      bS9.createOperatorSubscriber(subscriber, function (emittedValue) {
        // Select the value to compare
        const currentSelectedValue = selector(emittedValue);

        // Emit if first value or comparator returns false (i.e., value changed)
        if (isFirstEmission || !compareFn(previousSelectedValue, currentSelectedValue)) {
          isFirstEmission = false;
          previousSelectedValue = currentSelectedValue;
          subscriber.next(emittedValue);
        }
      })
    );
  });
}

module.exports = distinctUntilChangedWithSelector;