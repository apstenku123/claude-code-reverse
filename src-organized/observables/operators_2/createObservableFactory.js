/**
 * Creates an observable factory that processes interaction entries and allows optional mapping of emitted values.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries and emit values.
 * @param {Function} config - Optional cleanup or configuration function, called on teardown if provided.
 * @param {Function} [mapFunction] - Optional mapping function to transform emitted values.
 * @returns {WO9.Observable} An observable that emits processed interaction entries, optionally mapped.
 */
function createObservableFactory(processInteractionEntries, config, mapFunction) {
  // If a mapping function is provided, recursively create the observable and apply the mapping operator
  if (mapFunction) {
    return createObservableFactory(processInteractionEntries, config).pipe(
      JO9.mapOneOrManyArgs(mapFunction)
    );
  }

  // Otherwise, create a new observable
  return new WO9.Observable(function subscribe(observer) {
    // Handler to process arguments and emit them via observer.next
    const emitHandler = (...args) => {
      // If only one argument, emit isBlobOrFileLikeObject directly; otherwise, emit an array
      observer.next(args.length === 1 ? args[0] : args);
    };

    // Call the interaction processor, passing the emit handler
    const teardown = processInteractionEntries(emitHandler);

    // If config is a function, return a teardown function for cleanup
    if (FO9.isFunction(config)) {
      return function unsubscribe() {
        return config(emitHandler, teardown);
      };
    }
    // If no config function, no teardown is needed
    return undefined;
  });
}

module.exports = createObservableFactory;
