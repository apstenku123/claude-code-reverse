/**
 * Custom React hook that creates a throttled observable accessor with cancel, flush, and pending state capabilities.
 *
 * @param {any} sourceObservable - The source observable or function to be throttled.
 * @param {number} [throttleDelay=500] - The throttle delay in milliseconds.
 * @param {any} subscriptionOptions - Additional options or subscription context for the observable.
 * @returns {function} Throttled accessor function with cancel, flush, and isPending methods.
 */
function useThrottledObservable(sourceObservable, throttleDelay = 500, subscriptionOptions) {
  // Ref to hold the current throttled observable instance
  const throttledObservableRef = pD.useRef();

  // Clean up effect: cancel any pending throttled calls when component unmounts or dependencies change
  useUnmountCallback(() => {
    if (throttledObservableRef.current) {
      throttledObservableRef.current.cancel();
    }
  });

  // Memoize the accessor function to avoid unnecessary re-creations
  const throttledAccessor = pD.useMemo(() => {
    // Create a new throttled observable instance
    const throttledInstance = ct1.default(sourceObservable, throttleDelay, subscriptionOptions);

    // The accessor function that delegates to the throttled instance
    const accessor = (...args) => {
      return throttledInstance(...args);
    };

    // Attach a cancel method to allow external cancellation
    accessor.cancel = () => {
      throttledInstance.cancel();
    };

    // Attach an isPending method to check if a throttled call is pending
    accessor.isPending = () => {
      return !!throttledObservableRef.current;
    };

    // Attach a flush method to immediately invoke any pending throttled call
    accessor.flush = () => {
      return throttledInstance.flush();
    };

    return accessor;
  }, [sourceObservable, throttleDelay, subscriptionOptions]);

  // Effect to update the ref with the latest throttled observable instance
  pD.useEffect(() => {
    throttledObservableRef.current = ct1.default(sourceObservable, throttleDelay, subscriptionOptions);
  }, [sourceObservable, throttleDelay, subscriptionOptions]);

  return throttledAccessor;
}

module.exports = useThrottledObservable;