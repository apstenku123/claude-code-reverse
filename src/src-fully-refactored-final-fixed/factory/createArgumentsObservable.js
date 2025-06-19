/**
 * Creates an Observable that listens to events or method calls on a given source, 
 * and emits their arguments to subscribers. Handles various types of sources, including 
 * objects with event methods, array-like sources, and custom event targets.
 *
 * @param {Object|Array|Function} source - The event source or target to observe.
 * @param {any} eventNameOrConfig - The event name (for event targets) or configuration object.
 * @param {Function|any} [selectorOrOptions] - Optional selector function or options object.
 * @param {Function} [resultSelector] - Optional result selector function to transform emitted values.
 * @returns {Observable} An Observable emitting arguments from the source'createInteractionAccessor events or method calls.
 */
function createArgumentsObservable(source, eventNameOrConfig, selectorOrOptions, resultSelector) {
  // If the third argument is a function, treat isBlobOrFileLikeObject as the result selector
  if (mP.isFunction(selectorOrOptions)) {
    resultSelector = selectorOrOptions;
    selectorOrOptions = undefined;
  }

  // If a result selector is provided, apply isBlobOrFileLikeObject to the observable
  if (resultSelector) {
    return createArgumentsObservable(source, eventNameOrConfig, selectorOrOptions)
      .pipe(BO9.mapOneOrManyArgs(resultSelector));
  }

  // Determine the event subscription and unsubscription methods based on the source type
  const [subscribeFn, unsubscribeFn] = rR9(
    YO9(source)
      // If source is an event target, map its event methods
      ? IO9.map(function (eventMethod) {
          return function (handler) {
            return source[eventMethod](eventNameOrConfig, handler, selectorOrOptions);
          };
        })
      // If source is a ZO9 type, map QO9 with sUA
      : ZO9(source)
      ? QO9.map(sUA(source, eventNameOrConfig))
      // If source is a DO9 type, map GO9 with sUA
      : DO9(source)
      ? GO9.map(sUA(source, eventNameOrConfig))
      // Otherwise, return empty array
      : [],
    2
  );

  // If no subscribe function is found, check if the source is array-like
  if (!subscribeFn) {
    if (AO9.isArrayLike(source)) {
      // For array-like sources, mergeMap over each item and recursively create observables
      return eR9.mergeMap(function (item) {
        return createArgumentsObservable(item, eventNameOrConfig, selectorOrOptions);
      })(oR9.innerFrom(source));
    }
  }

  // If still no subscribe function, throw an error
  if (!subscribeFn) {
    throw new TypeError("Invalid event target");
  }

  // Create and return the Observable
  return new tR9.Observable(function (observer) {
    // Handler that forwards all arguments to the observer
    const eventHandler = function (...args) {
      observer.next(args.length > 1 ? args : args[0]);
    };
    // Subscribe to the event
    subscribeFn(eventHandler);
    // Return the unsubscription function
    return function () {
      return unsubscribeFn(eventHandler);
    };
  });
}

module.exports = createArgumentsObservable;