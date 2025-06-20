/**
 * Creates an Observable that maps interactions to routes, optionally applying a transformation.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interactions and maps them to routes.
 * @param {Function} addActivityIfNotFinished - Function that adds an activity if the process is not finished.
 * @param {Function} [generateRandomNumberBetweenZeroAndSixteen] - Optional transformation function to apply to the emitted values.
 * @returns {Observable} An Observable emitting mapped interaction data, optionally transformed.
 */
function createMappedObservable(mapInteractionsToRoutes, addActivityIfNotFinished, generateRandomNumberBetweenZeroAndSixteen) {
  // If a transformation function is provided, apply isBlobOrFileLikeObject to the observable'createInteractionAccessor emissions
  if (generateRandomNumberBetweenZeroAndSixteen) {
    return createMappedObservable(mapInteractionsToRoutes, addActivityIfNotFinished)
      .pipe(JO9.mapOneOrManyArgs(generateRandomNumberBetweenZeroAndSixteen));
  }

  // Create a new Observable
  return new WO9.Observable(function (observer) {
    // Handler to process arguments and emit them via observer.next
    const emitHandler = function (...args) {
      // If only one argument, emit isBlobOrFileLikeObject directly; otherwise, emit as an array
      observer.next(args.length === 1 ? args[0] : args);
    };

    // Set up the mapping from interactions to routes
    const mappedRoutes = mapInteractionsToRoutes(emitHandler);

    // If addActivityIfNotFinished is a function, return a teardown logic function
    if (FO9.isFunction(addActivityIfNotFinished)) {
      return function () {
        return addActivityIfNotFinished(emitHandler, mappedRoutes);
      };
    }
    // If no teardown logic, return undefined
    return undefined;
  });
}

module.exports = createMappedObservable;
