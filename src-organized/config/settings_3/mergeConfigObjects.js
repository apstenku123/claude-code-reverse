/**
 * Merges two configuration objects, combining their top-level properties and deeply merging
 * the 'feature_gates', 'layer_configs', and 'dynamic_configs' sub-objects.
 *
 * @param {Object} baseConfig - The base configuration object to merge from.
 * @param {Object} overrideConfig - The configuration object whose properties will override those in baseConfig.
 * @returns {Object} a new object containing merged properties from both input objects.
 */
function mergeConfigObjects(baseConfig, overrideConfig) {
  return Object.assign(
    {},
    baseConfig, // Start with all properties from baseConfig
    overrideConfig, // Override with properties from overrideConfig
    {
      // Deep merge specific nested objects
      feature_gates: Object.assign(
        {},
        baseConfig.feature_gates || {},
        overrideConfig.feature_gates || {}
      ),
      layer_configs: Object.assign(
        {},
        baseConfig.layer_configs || {},
        overrideConfig.layer_configs || {}
      ),
      dynamic_configs: Object.assign(
        {},
        baseConfig.dynamic_configs || {},
        overrideConfig.dynamic_configs || {}
      )
    }
  );
}

module.exports = mergeConfigObjects;