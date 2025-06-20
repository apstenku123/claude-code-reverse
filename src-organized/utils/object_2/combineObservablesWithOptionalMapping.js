/**
 * Combines multiple observables, applies an optional result selector, and supports custom scheduling.
 *
 * @function combineObservablesWithOptionalMapping
 * @param {...any} sources - The observables or values to combine. May include a scheduler or result selector as the last arguments.
 * @returns {Observable|any} An Observable that emits combined values, optionally mapped by a result selector.
 */
function combineObservablesWithOptionalMapping(...sources) {
  // Extract an optional scheduler from the end of the sources array
  const scheduler = qUA.popScheduler(sources);
  // Extract an optional result selector function from the end of the sources array
  const resultSelector = qUA.popResultSelector(sources);
  // Parse the remaining arguments into an array of observables/values and optional keys
  const { args: observablesOrValues, keys } = JR9.argsArgArrayOrObject(sources);

  // If there are no observables/values to combine, return an empty observable with the scheduler
  if (observablesOrValues.length === 0) {
    return LUA.from([], scheduler);
  }

  // Create a new Observable that combines the provided observables/values
  const combinedObservable = new FR9.Observable(
    OUA(
      observablesOrValues,
      scheduler,
      // If keys are provided, map the combined values to an object using the keys
      keys
        ? function (combinedValues) {
            return CR9.createObject(keys, combinedValues);
          }
        : RUA.identity // Otherwise, return the combined values as-is
    )
  );

  // If a result selector is provided, apply isBlobOrFileLikeObject using the mapOneOrManyArgs operator
  return resultSelector
    ? combinedObservable.pipe(XR9.mapOneOrManyArgs(resultSelector))
    : combinedObservable;
}

module.exports = combineObservablesWithOptionalMapping;