/**
 * Custom React hook that returns a debounced observable accessor with cancel, flush, and pending state methods.
 *
 * @param {any} sourceObservable - The source observable or function to debounce.
 * @param {number} [debounceDelay=500] - The debounce delay in milliseconds.
 * @param {any} subscriptionOptions - Optional subscription or configuration for the observable.
 * @returns {function} Debounced accessor function with cancel, flush, and isPending methods.
 */
function useDebouncedObservable(sourceObservable, debounceDelay = 500, subscriptionOptions) {
  // Ref to hold the debounced observable instance
  const debouncedRef = pD.useRef();

  // Cancel any existing debounced observable on unmount or dependency change
  useUnmountCallback(() => {
    if (debouncedRef.current) {
      debouncedRef.current.cancel();
    }
  });

  // Memoize the debounced accessor and its helper methods
  const debouncedAccessor = pD.useMemo(() => {
    // Create a new debounced observable instance
    const debouncedInstance = ct1.default(sourceObservable, debounceDelay, subscriptionOptions);

    // The main accessor function, forwarding all arguments
    const accessor = (...args) => {
      return debouncedInstance(...args);
    };

    // Attach a cancel method to the accessor
    accessor.cancel = () => {
      debouncedInstance.cancel();
    };

    // Attach an isPending method to check if the observable is active
    accessor.isPending = () => {
      return !!debouncedRef.current;
    };

    // Attach a flush method to immediately invoke the debounced function
    accessor.flush = () => {
      return debouncedInstance.flush();
    };

    return accessor;
  }, [sourceObservable, debounceDelay, subscriptionOptions]);

  // Update the ref with the latest debounced observable instance on dependency change
  pD.useEffect(() => {
    debouncedRef.current = ct1.default(sourceObservable, debounceDelay, subscriptionOptions);
  }, [sourceObservable, debounceDelay, subscriptionOptions]);

  return debouncedAccessor;
}

module.exports = useDebouncedObservable;