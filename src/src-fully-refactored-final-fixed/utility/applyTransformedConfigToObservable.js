/**
 * Applies a transformed configuration to a source observable if the observable is valid.
 *
 * @param {Array|Object} sourceObservable - The observable or array to which the configuration will be applied.
 * @param {any} config - The configuration value to be transformed and applied.
 * @returns {Array|Object} The result of applying the transformed configuration to the observable, or an empty array if the observable is invalid.
 */
function applyTransformedConfigToObservable(sourceObservable, config) {
  // Check if the sourceObservable exists and has a length property (is non-empty)
  if (sourceObservable && sourceObservable.length) {
    // Transform the config using Sq with argument 2, then apply x4A to the observable
    const transformedConfig = Sq(config, 2);
    return x4A(sourceObservable, transformedConfig);
  }
  // Return an empty array if the observable is invalid or empty
  return [];
}

module.exports = applyTransformedConfigToObservable;