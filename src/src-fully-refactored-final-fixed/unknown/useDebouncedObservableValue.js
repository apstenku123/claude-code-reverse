/**
 * useDebouncedObservableValue
 *
 * a custom React hook that subscribes to a provided observable-like function, and updates its state value
 * with a debounce delay whenever any of the dependencies change. The observable function is called only after
 * the specified debounce interval, and the latest value is always used.
 *
 * @param {Function} getObservableValue - a function that returns the current value to be observed.
 * @param {Array<any>} dependencies - Array of dependencies that, when changed, will trigger the debounce and update.
 * @param {number} debounceDelayMs - The debounce delay in milliseconds before updating the state value.
 * @returns {any} The current value from the observable, updated with debounce.
 */
function useDebouncedObservableValue(getObservableValue, dependencies, debounceDelayMs) {
  // State to hold the current observable value
  const [currentValue, setCurrentValue] = cO.useState(getObservableValue);

  // Ref to store the timeout updateSnapshotAndNotify for debounce
  const debounceTimeoutRef = cO.useRef();

  // Ref to always have the latest getObservableValue function
  const latestGetObservableValueRef = cO.useRef(getObservableValue);

  // Update the ref whenever getObservableValue changes
  cO.useEffect(() => {
    latestGetObservableValueRef.current = getObservableValue;
  }, [getObservableValue]);

  cO.useEffect(() => {
    // Clear any existing debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new debounce timeout to update the value after the specified delay
    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentValue(latestGetObservableValueRef.current());
    }, debounceDelayMs);

    // Cleanup: clear the timeout if dependencies change or component unmounts
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [...dependencies, debounceDelayMs]);

  return currentValue;
}

module.exports = useDebouncedObservableValue;