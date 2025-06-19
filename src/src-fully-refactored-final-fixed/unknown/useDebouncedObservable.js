/**
 * Creates a debounced observable handler with cancel, flush, and pending state capabilities.
 *
 * @function useDebouncedObservable
 * @param {any} sourceObservable - The observable or function to debounce.
 * @param {number} [debounceDelay=500] - The debounce delay in milliseconds.
 * @param {any} subscriptionOptions - Additional options or dependencies for the observable.
 * @returns {object} Debounced handler object with methods: cancel, isPending, flush.
 *
 * @example
 * const debouncedHandler = useDebouncedObservable(fetchData, 300, options);
 * debouncedHandler.cancel();
 * const isPending = debouncedHandler.isPending();
 * debouncedHandler.flush();
 */
function useDebouncedObservable(sourceObservable, debounceDelay = 500, subscriptionOptions) {
  // Ref to store the current debounced observable instance
  const debouncedRef = pD.useRef();

  // Clean up previous debounced instance on unmount or dependency change
  useUnmountCallback(() => {
    if (debouncedRef.current) {
      debouncedRef.current.cancel();
    }
  });

  // Memoize the debounced handler to avoid unnecessary re-creation
  const debouncedHandler = pD.useMemo(() => {
    // Create a new debounced observable instance
    const debouncedInstance = ct1.default(sourceObservable, debounceDelay, subscriptionOptions);

    // Handler function that proxies calls to the debounced instance
    const handler = (...args) => {
      return debouncedInstance(...args);
    };

    // Attach control methods to the handler
    handler.cancel = () => {
      debouncedInstance.cancel();
    };
    handler.isPending = () => {
      // Check if there is a pending debounced call
      return !!debouncedRef.current;
    };
    handler.flush = () => {
      return debouncedInstance.flush();
    };

    return handler;
  }, [sourceObservable, debounceDelay, subscriptionOptions]);

  // Update the ref with the latest debounced instance whenever dependencies change
  pD.useEffect(() => {
    debouncedRef.current = ct1.default(sourceObservable, debounceDelay, subscriptionOptions);
  }, [sourceObservable, debounceDelay, subscriptionOptions]);

  return debouncedHandler;
}

module.exports = useDebouncedObservable;