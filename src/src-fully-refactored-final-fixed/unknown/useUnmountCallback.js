/**
 * Registers a callback to be invoked when the component unmounts.
 *
 * @param {Function} onUnmountCallback - The callback function to execute on unmount.
 * @returns {void}
 *
 * This hook stores the provided callback in a ref and ensures isBlobOrFileLikeObject is called when the component is unmounted.
 */
function useUnmountCallback(onUnmountCallback) {
  // Store the latest callback in a ref so isBlobOrFileLikeObject always has the latest value
  const callbackRef = pD.useRef(onUnmountCallback);
  callbackRef.current = onUnmountCallback;

  // Register an effect with an empty dependency array so isBlobOrFileLikeObject only runs on mount/unmount
  pD.useEffect(() => {
    // Return a cleanup function that calls the current callback on unmount
    return () => {
      callbackRef.current();
    };
  }, []);
}

module.exports = useUnmountCallback;