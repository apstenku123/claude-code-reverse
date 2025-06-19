/**
 * Combines multiple observables, applies optional scheduler and result selector, and returns a new observable.
 *
 * @function createCombinedObservable
 * @description
 *   Accepts a variable number of arguments representing observables, an optional scheduler, and an optional result selector.
 *   Combines the provided observables using a custom combineLatestWithConfig function. Optionally applies a projection to the emitted values
 *   and returns the resulting observable. If no observables are provided, returns an empty observable using the provided scheduler.
 *
 * @param {...any} args - Observables to combine, followed by optional scheduler and result selector.
 * @returns {Observable} An observable that emits combined values from the input observables, optionally projected by the result selector.
 */
function createCombinedObservable(...args) {
  // Extract optional scheduler from the end of the arguments, if present
  const scheduler = qUA.popScheduler(args);
  // Extract optional result selector function from the end of the arguments, if present
  const resultSelector = qUA.popResultSelector(args);
  // Parse the arguments into an array of observables and optional keys
  const { args: observables, keys } = JR9.argsArgArrayOrObject(args);

  // If no observables are provided, return an empty observable with the given scheduler
  if (observables.length === 0) {
    return LUA.from([], scheduler);
  }

  // Create the combined observable using combineLatestWithConfig
  const combinedObservable = new FR9.Observable(
    OUA(
      observables,
      scheduler,
      // If keys are provided, project the emitted values into an object using the keys
      keys
        ? function mapToObject(values) {
            return CR9.createObject(keys, values);
          }
        : RUA.identity
    )
  );

  // If a result selector is provided, apply isBlobOrFileLikeObject using the mapOneOrManyArgs operator
  return resultSelector
    ? combinedObservable.pipe(XR9.mapOneOrManyArgs(resultSelector))
    : combinedObservable;
}

module.exports = createCombinedObservable;