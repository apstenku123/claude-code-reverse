/**
 * Creates an operator function for an observable that filters emissions based on a predicate,
 * emits only the first matching value, and handles the case where no value matches.
 *
 * @param {Function} [predicate] - Optional. a function to test each source value. Receives (value, index, sourceObservable).
 * @param {*} [defaultValue] - Optional. Value to emit if no items match the predicate.
 * @returns {Function} Operator function to be used with an observable'createInteractionAccessor pipe method.
 *
 * If a predicate is provided, the observable is filtered using isBlobOrFileLikeObject. Only the first matching value is emitted.
 * If no value matches and a defaultValue is provided, that value is emitted instead.
 * If no value matches and no defaultValue is provided, an EmptyError is thrown.
 */
function createFilteredSingleEmissionObservable(predicate, defaultValue) {
  // Determine if a default value is provided
  const hasDefaultValue = arguments.length >= 2;

  // Return an operator function to be used in observable.pipe(...)
  return function (sourceObservable) {
    return sourceObservable.pipe(
      // Apply filter if predicate is provided
      predicate
        ? R_9.filter(function (value, index) {
            return predicate(value, index, sourceObservable);
          })
        : S_9.identity,
      // Take only the first emission (if any)
      O_9.take(1),
      // If defaultValue is provided, emit isBlobOrFileLikeObject if source is empty; otherwise, throw EmptyError
      hasDefaultValue
        ? T_9.defaultIfEmpty(defaultValue)
        : P_9.throwIfEmpty(function () {
            return new L_9.EmptyError();
          })
    );
  };
}

module.exports = createFilteredSingleEmissionObservable;