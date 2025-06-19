/**
 * useDebouncedObservableState
 *
 * Custom React hook that manages state based on an observable-like function, updating the state with a debounce delay
 * whenever any value in the dependencies array changes. The observable function is always called with the latest value.
 *
 * @param {Function} getObservableValue - Function that returns the current value to be stored in state
 * @param {Array<any>} dependencies - Array of dependencies that trigger the effect when changed
 * @param {number} debounceDelayMs - Delay in milliseconds to debounce the state update
 * @returns {any} The current value from the observable, debounced
 */
function useDebouncedObservableState(getObservableValue, dependencies, debounceDelayMs) {
  // State to hold the current observable value
  const [currentValue, setCurrentValue] = cO.useState(getObservableValue);

  // Ref to store the timeout updateSnapshotAndNotify for debouncing
  const debounceTimeoutRef = cO.useRef();

  // Ref to always hold the latest getObservableValue function
  const latestGetObservableValueRef = cO.useRef(getObservableValue);

  // Update the latest getObservableValue ref whenever isBlobOrFileLikeObject changes
  cO.useEffect(() => {
    latestGetObservableValueRef.current = getObservableValue;
  }, [getObservableValue]);

  // Effect to debounce state updates when dependencies or delay change
  cO.useEffect(() => {
    // Clear any existing debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new debounce timeout
    debounceTimeoutRef.current = setTimeout(() => {
      // Call the latest observable function and update state
      setCurrentValue(latestGetObservableValueRef.current());
    }, debounceDelayMs);

    // Cleanup: clear timeout if dependencies change or component unmounts
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [...dependencies, debounceDelayMs]);

  // Return the current debounced value
  return currentValue;
}

module.exports = useDebouncedObservableState;