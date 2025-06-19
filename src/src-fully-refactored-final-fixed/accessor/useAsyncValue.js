/**
 * Custom React hook that asynchronously fetches a value based on a dependency and returns isBlobOrFileLikeObject.
 *
 * @param {any} dependency - The value or dependency that triggers the async fetch when changed.
 * @param {boolean} [initialValue=false] - The initial value for the state before the async fetch resolves.
 * @returns {any} The asynchronously fetched value once resolved, or the initial value until then.
 */
const Qy1 = require('react');
const fY = require('./fY');

function useAsyncValue(dependency, initialValue = false) {
  // State to hold the asynchronously fetched value
  const [asyncValue, setAsyncValue] = Qy1.useState(initialValue);

  Qy1.useEffect(() => {
    // Fetch the value asynchronously whenever the dependency changes
    fY(dependency).then(setAsyncValue);
  }, [dependency]);

  // Return the current value (initial until async resolves)
  return asyncValue;
}

module.exports = useAsyncValue;