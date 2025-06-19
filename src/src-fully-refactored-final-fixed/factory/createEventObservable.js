/**
 * Creates an Observable from various event sources, handling different types of event targets and configurations.
 *
 * @param {any} eventSource - The source to listen for events on (e.g., DOM element, Node.js EventEmitter, array-like, etc.).
 * @param {any} eventNameOrConfig - The event name to listen for, or a configuration object depending on the source type.
 * @param {Function|any} [optionsOrHandler] - Optional options object or event handler function. If a function is provided, isBlobOrFileLikeObject is treated as the handler.
 * @param {Function} [handler] - Optional event handler function if not provided as the third argument.
 * @returns {Observable} An Observable that emits event data from the source.
 */
function createEventObservable(eventSource, eventNameOrConfig, optionsOrHandler, handler) {
  // If the third argument is a function, treat isBlobOrFileLikeObject as the handler and shift arguments
  if (mP.isFunction(optionsOrHandler)) {
    handler = optionsOrHandler;
    optionsOrHandler = undefined;
  }

  // If a handler is provided, recursively create the observable and map the handler over the emitted values
  if (handler) {
    return createEventObservable(eventSource, eventNameOrConfig, optionsOrHandler)
      .pipe(BO9.mapOneOrManyArgs(handler));
  }

  // Determine the appropriate event subscription and unsubscription functions based on the source type
  const [subscribeFn, unsubscribeFn] = rR9(
    YO9(eventSource)
      ? IO9.map(function (eventType) {
          return function (eventHandler) {
            return eventSource[eventType](eventNameOrConfig, eventHandler, optionsOrHandler);
          };
        })
      : ZO9(eventSource)
      ? QO9.map(sUA(eventSource, eventNameOrConfig))
      : DO9(eventSource)
      ? GO9.map(sUA(eventSource, eventNameOrConfig))
      : [],
    2
  );

  // If no subscribe function is found, but the source is array-like, merge observables from each item
  if (!subscribeFn) {
    if (AO9.isArrayLike(eventSource)) {
      return eR9.mergeMap(function (item) {
        return createEventObservable(item, eventNameOrConfig, optionsOrHandler);
      })(oR9.innerFrom(eventSource));
    }
  }

  // If still no subscribe function, throw an error
  if (!subscribeFn) {
    throw new TypeError("Invalid event target");
  }

  // Return an Observable that subscribes to the event and cleans up on unsubscription
  return new tR9.Observable(function (observer) {
    // Handler that forwards all arguments to the observer, as a single value or array
    const eventHandler = function (...args) {
      observer.next(args.length > 1 ? args : args[0]);
    };
    // Subscribe to the event
    subscribeFn(eventHandler);
    // Return the unsubscription logic
    return function () {
      return unsubscribeFn(eventHandler);
    };
  });
}

module.exports = createEventObservable;