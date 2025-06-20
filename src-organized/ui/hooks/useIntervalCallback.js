/**
 * useIntervalCallback sets up a recurring interval that calls the latest version of a callback function.
 * The interval is automatically cleared when the component unmounts or when the delay changes.
 *
 * @param {Function} callback - The function to be called at each interval tick.
 * @param {number|null} delay - The delay in milliseconds for the interval. If null, the interval is not set.
 */
function useIntervalCallback(callback, delay) {
  // Store a mutable reference to the latest callback
  const callbackRef = pD.useRef(callback);

  // Update the ref whenever the callback changes
  RW5(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval effect
  pD.useEffect(() => {
    // If delay is null, do not set up the interval
    if (delay === null) return;

    // Call the latest callback at each interval tick
    const intervalId = setInterval(() => {
      callbackRef.current();
    }, delay);

    // Clear the interval when the component unmounts or delay changes
    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);
}

module.exports = useIntervalCallback;