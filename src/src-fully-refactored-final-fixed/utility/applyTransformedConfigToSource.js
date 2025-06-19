/**
 * Applies a transformed configuration to a source observable using external utility functions.
 *
 * @param {Observable} sourceObservable - The source observable to which the configuration will be applied.
 * @param {Object} config - The configuration object that will be transformed and applied.
 * @returns {Observable} The result of applying the transformed configuration to the source observable.
 */
function applyTransformedConfigToSource(sourceObservable, config) {
  // Transform the configuration using getConfiguredIteratee with a fixed parameter (2)
  const transformedConfig = getConfiguredIteratee(config, 2);
  // Apply the transformed configuration to the source observable using initializeWithPayload
  return initializeWithPayload(sourceObservable, transformedConfig);
}

module.exports = applyTransformedConfigToSource;