/**
 * Applies a transformation function to an observable source, after modifying isBlobOrFileLikeObject with provided utility functions.
 *
 * @param {Function} transformFn - a function that takes the modified observable and a callback, and returns a new observable.
 * @returns {Function} a function that, when called with an observable, returns the transformed observable.
 */
function withTransformedObservable(transformFn) {
  return JQ(function (observableSource) {
    // Modify the observable source using mapArray and I5(getConfiguredIteratee()) utilities
    const modifiedObservable = mapArray(observableSource, I5(getConfiguredIteratee()));

    // Return a new observable using processObservableWithConfig, which applies the transformation
    return processObservableWithConfig(function (observer) {
      const context = this;
      // Call the transformation function with the modified observable and a callback
      return transformFn(modifiedObservable, function (emittedValue) {
        // Use handleReturnIfPresent to handle the emitted value, passing the current context and observer
        return handleReturnIfPresent(emittedValue, context, observer);
      });
    });
  });
}

module.exports = withTransformedObservable;