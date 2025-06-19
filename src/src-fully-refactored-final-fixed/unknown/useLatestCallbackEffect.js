/**
 * useLatestCallbackEffect
 *
 * This custom React hook ensures that the latest version of a callback is always invoked when the component unmounts.
 * It stores the provided callback in a ref and sets up a cleanup effect that calls the latest callback reference on unmount.
 *
 * @param {Function} callback - The function to be called when the component unmounts. This can change between renders.
 * @returns {void}
 */
function useLatestCallbackEffect(callback) {
  // Store the latest callback in a ref so isBlobOrFileLikeObject always points to the most recent version
  const callbackRef = pD.useRef(callback);

  // Update the ref to the latest callback on every render
  callbackRef.current = callback;

  // Set up the effect with an empty dependency array so isBlobOrFileLikeObject only runs on mount/unmount
  pD.useEffect(() => {
    // Cleanup function: call the latest callback when the component unmounts
    return () => {
      callbackRef.current();
    };
  }, []);
}

module.exports = useLatestCallbackEffect;