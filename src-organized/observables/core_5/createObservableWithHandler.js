/**
 * Creates an Observable that emits values from a source function, optionally transforming the output with a handler.
 * If a handler function is provided, the observable'createInteractionAccessor emissions are piped through a mapping function.
 *
 * @param {Function} sourceObservableFactory - Function that receives an emit handler and returns a subscription or teardown logic.
 * @param {Function} teardownOrConfig - Optional function for teardown logic or configuration, called with the emit handler and the subscription.
 * @param {Function} [mapHandler] - Optional function to transform the emitted values.
 * @returns {WO9.Observable} An Observable that emits values from the source, optionally transformed by the handler.
 */
function createObservableWithHandler(sourceObservableFactory, teardownOrConfig, mapHandler) {
  // If a mapHandler is provided, recursively create the observable and pipe through the mapping function
  if (mapHandler) {
    return createObservableWithHandler(sourceObservableFactory, teardownOrConfig)
      .pipe(JO9.mapOneOrManyArgs(mapHandler));
  }

  // Create a new Observable
  return new WO9.Observable(function subscribe(observer) {
    // Handler to emit values to the observer
    const emitHandler = function (...args) {
      // If only one argument, emit isBlobOrFileLikeObject directly; otherwise, emit the array
      observer.next(args.length === 1 ? args[0] : args);
    };

    // Call the source factory with the emit handler, which may return a subscription or teardown logic
    const subscription = sourceObservableFactory(emitHandler);

    // If teardownOrConfig is a function, return a teardown function for the Observable
    if (FO9.isFunction(teardownOrConfig)) {
      return function teardown() {
        return teardownOrConfig(emitHandler, subscription);
      };
    }
    // Otherwise, no teardown logic
    return undefined;
  });
}

module.exports = createObservableWithHandler;