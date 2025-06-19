/**
 * Filters an observable stream using an optional predicate, takes the last emitted value,
 * and provides a default value if the stream is empty (or throws an error if not specified).
 *
 * @param {Function} [predicate] - Optional. a function to filter the observable'createInteractionAccessor values. Receives (value, index, sourceObservable).
 * @param {*} [defaultValue] - Optional. The value to emit if the observable is empty after filtering.
 * @returns {Function} An operator function that can be piped into an observable.
 */
function filterAndTakeLastOrDefault(predicate, defaultValue) {
  // Determine if a default value has been provided
  const hasDefaultValue = arguments.length >= 2;

  /**
   * @param {Observable} sourceObservable - The observable to operate on.
   * @returns {Observable} The transformed observable.
   */
  return function applyOperators(sourceObservable) {
    return sourceObservable.pipe(
      // If a predicate is provided, filter the observable'createInteractionAccessor values
      predicate
        ? l_9.filter(function filterWithPredicate(value, index) {
            return predicate(value, index, sourceObservable);
          })
        : s_9.identity, // If no predicate, pass values through unchanged
      i_9.takeLast(1), // Take only the last emitted value
      hasDefaultValue
        ? a_9.defaultIfEmpty(defaultValue) // If empty, emit the default value
        : n_9.throwIfEmpty(function throwEmptyError() {
            return new c_9.EmptyError(); // If empty and no default, throw error
          })
    );
  };
}

module.exports = filterAndTakeLastOrDefault;