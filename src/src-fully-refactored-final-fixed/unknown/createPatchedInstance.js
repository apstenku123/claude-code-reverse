/**
 * Creates a new instance of kM6 with the provided source observable and configuration,
 * and returns its 'patch' property. This is typically used to apply a patch or modification
 * to the observable stream based on the configuration.
 *
 * @param {Observable} sourceObservable - The source observable to be patched or processed.
 * @param {Object} config - Configuration object that determines how the patch is applied.
 * @returns {any} The 'patch' property from the created kM6 instance, representing the patched observable or result.
 */
function createPatchedInstance(sourceObservable, config) {
  // Instantiate kM6 with the source observable and configuration
  const patchedInstance = new kM6(sourceObservable, config);
  // Return the 'patch' property from the instance
  return patchedInstance.patch;
}

module.exports = createPatchedInstance;
