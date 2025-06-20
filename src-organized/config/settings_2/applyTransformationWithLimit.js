/**
 * Applies a transformation to the given source value using a limited configuration.
 *
 * This utility function first limits the configuration using the `limitConfig` function,
 * then applies the transformation using the `applyTransformation` function.
 *
 * @param {any} sourceValue - The value or observable to be transformed.
 * @param {any} config - The configuration object to be limited and used in the transformation.
 * @returns {any} The result of applying the transformation with the limited configuration.
 */
function applyTransformationWithLimit(sourceValue, config) {
  // Limit the configuration to a maximum of 2 using limitConfig
  const limitedConfig = limitConfig(config, 2);
  // Apply the transformation to the source value with the limited configuration
  return applyTransformation(sourceValue, limitedConfig);
}

module.exports = applyTransformationWithLimit;
