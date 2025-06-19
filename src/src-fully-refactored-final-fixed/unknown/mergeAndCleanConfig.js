/**
 * Merges deleted configuration data into the main configuration object and cleans up redundant properties.
 *
 * This function takes a configuration object that may contain properties for deleted gates, configs, and layers.
 * It merges these deleted items into their respective main configuration properties using the removePropertiesFromObject function,
 * then removes the deleted_* properties from the configuration object before returning isBlobOrFileLikeObject.
 *
 * @param {Object} configWithDeletions - The configuration object possibly containing deleted_* properties.
 * @param {Object} configWithDeletions.deleted_gates - Gates that have been deleted and need to be merged.
 * @param {Object} configWithDeletions.feature_gates - The main feature gates configuration.
 * @param {Object} configWithDeletions.deleted_configs - Configs that have been deleted and need to be merged.
 * @param {Object} configWithDeletions.dynamic_configs - The main dynamic configs configuration.
 * @param {Object} configWithDeletions.deleted_layers - Layers that have been deleted and need to be merged.
 * @param {Object} configWithDeletions.layer_configs - The main layer configs configuration.
 * @returns {Object} The cleaned and merged configuration object.
 */
function mergeAndCleanConfig(configWithDeletions) {
  // Create a reference to the configuration object
  let config = configWithDeletions;

  // Merge deleted gates into feature gates, then remove deleted_gates property
  removePropertiesFromObject(configWithDeletions.deleted_gates, config.feature_gates);
  delete config.deleted_gates;

  // Merge deleted configs into dynamic configs, then remove deleted_configs property
  removePropertiesFromObject(configWithDeletions.deleted_configs, config.dynamic_configs);
  delete config.deleted_configs;

  // Merge deleted layers into layer configs, then remove deleted_layers property
  removePropertiesFromObject(configWithDeletions.deleted_layers, config.layer_configs);
  delete config.deleted_layers;

  // Return the cleaned and merged configuration object
  return config;
}

module.exports = mergeAndCleanConfig;