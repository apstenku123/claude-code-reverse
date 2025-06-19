/**
 * Calls the provided callback function when the component unmounts, always using the latest version of the callback.
 *
 * @param {Function} callback - The function to be called on component unmount. This can change between renders.
 * @returns {void}
 */
function useMountEffectWithLatestCallback(callback) {
  // Store a mutable reference to the latest callback
  const callbackRef = pD.useRef(callback);

  // Update the ref to always point to the latest callback
  callbackRef.current = callback;

  // Register an effect that runs only on mount and cleanup on unmount
  pD.useEffect(() => {
    // Cleanup function: call the latest callback when unmounting
    return () => {
      callbackRef.current();
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount
}

module.exports = useMountEffectWithLatestCallback;