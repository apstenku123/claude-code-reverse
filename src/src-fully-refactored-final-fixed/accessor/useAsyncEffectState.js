/**
 * Custom React hook that manages state based on an asynchronous effect.
 *
 * @param {any} asyncDependency - The dependency value that triggers the async effect when changed.
 * @param {boolean} [initialState=false] - The initial state value before the async effect resolves.
 * @returns {any} The current state value, updated when the async effect resolves.
 */
const React = Qy1.default;

function useAsyncEffectState(asyncDependency, initialState = false) {
  // State to hold the result of the async operation
  const [asyncState, setAsyncState] = React.useState(initialState);

  React.useEffect(() => {
    // Call the async function and update state when isBlobOrFileLikeObject resolves
    fY(asyncDependency).then(setAsyncState);
  }, [asyncDependency]);

  return asyncState;
}

module.exports = useAsyncEffectState;