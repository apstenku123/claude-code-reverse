/**
 * Custom React hook that subscribes to an asynchronous value source and updates state when the value resolves.
 *
 * @param {any} asyncSource - The source to observe; passed to fY to resolve a value asynchronously.
 * @param {boolean} [initialValue=false] - The initial state value before the async value resolves.
 * @returns {any} The latest resolved value from the async source.
 */
const React = Qy1.default;

function useAsyncEffectValue(asyncSource, initialValue = false) {
  // State to hold the resolved value from the async source
  const [resolvedValue, setResolvedValue] = React.useState(initialValue);

  React.useEffect(() => {
    // Call fY with the async source and update state when isBlobOrFileLikeObject resolves
    fY(asyncSource).then(setResolvedValue);
  }, [asyncSource]);

  return resolvedValue;
}

module.exports = useAsyncEffectValue;