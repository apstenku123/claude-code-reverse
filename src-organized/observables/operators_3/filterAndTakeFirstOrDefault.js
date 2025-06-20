/**
 * Filters an observable stream using an optional predicate, takes the first matching value, 
 * and provides a default or throws if empty.
 *
 * @param {Function} [predicate] - Optional predicate function to filter the observable stream. 
 *   Signature: (value, index, sourceObservable) => boolean
 * @param {*} [defaultValue] - Optional default value to emit if the filtered stream is empty.
 * @returns {Function} - a function that takes an observable and returns a new observable
 *   that emits the first filtered value, or the default, or throws if empty.
 */
function filterAndTakeFirstOrDefault(predicate, defaultValue) {
  const hasDefaultValue = arguments.length >= 2;
  return function (sourceObservable) {
    // If a predicate is provided, filter the source observable
    // Otherwise, use the identity function (no filtering)
    const filterOperator = predicate
      ? R_9.filter((value, index) => predicate(value, index, sourceObservable))
      : S_9.identity;

    // Compose the observable pipeline
    return sourceObservable.pipe(
      filterOperator,
      O_9.take(1),
      hasDefaultValue
        ? T_9.defaultIfEmpty(defaultValue) // Emit default if empty
        : P_9.throwIfEmpty(() => new L_9.EmptyError()) // Throw if empty
    );
  };
}

module.exports = filterAndTakeFirstOrDefault;