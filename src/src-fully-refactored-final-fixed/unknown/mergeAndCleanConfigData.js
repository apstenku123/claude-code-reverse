/**
 * Merges deleted and active configuration data into a single config object and cleans up deleted properties.
 *
 * This function takes a configuration object that may contain properties for deleted gates, configs, and layers.
 * It merges these deleted properties into their respective active configuration properties using the removePropertiesFromObject function,
 * then removes the deleted properties from the config object. The resulting config object contains only the active
 * configuration properties, updated with any deletions applied.
 *
 * @param {Object} configData - The configuration object containing active and deleted config data.
 * @param {Object} configData.deleted_gates - Deleted feature gates to be merged.
 * @param {Object} configData.feature_gates - Active feature gates to be updated.
 * @param {Object} configData.deleted_configs - Deleted dynamic configs to be merged.
 * @param {Object} configData.dynamic_configs - Active dynamic configs to be updated.
 * @param {Object} configData.deleted_layers - Deleted layer configs to be merged.
 * @param {Object} configData.layer_configs - Active layer configs to be updated.
 * @returns {Object} The cleaned and merged configuration object.
 */
function mergeAndCleanConfigData(configData) {
  // Create a reference to the config object to be mutated
  let mergedConfig = configData;

  // Merge deleted feature gates into active feature gates
  removePropertiesFromObject(configData.deleted_gates, mergedConfig.feature_gates);
  // Remove the deleted_gates property after merging
  delete mergedConfig.deleted_gates;

  // Merge deleted dynamic configs into active dynamic configs
  removePropertiesFromObject(configData.deleted_configs, mergedConfig.dynamic_configs);
  // Remove the deleted_configs property after merging
  delete mergedConfig.deleted_configs;

  // Merge deleted layer configs into active layer configs
  removePropertiesFromObject(configData.deleted_layers, mergedConfig.layer_configs);
  // Remove the deleted_layers property after merging
  delete mergedConfig.deleted_layers;

  // Return the cleaned and merged config object
  return mergedConfig;
}

module.exports = mergeAndCleanConfigData;