/**
 * Returns the patched observable from a kM6 instance initialized with the given source and configuration.
 *
 * @param {Observable} sourceObservable - The source observable to be patched.
 * @param {Object} config - Configuration options for patching the observable.
 * @returns {any} The patched observable as provided by the kM6 instance.
 */
function getPatchedObservable(sourceObservable, config) {
  // Create a new kM6 instance with the provided source and configuration
  const kM6Instance = new kM6(sourceObservable, config);
  // Return the patched observable from the kM6 instance
  return kM6Instance.patch;
}

module.exports = getPatchedObservable;
