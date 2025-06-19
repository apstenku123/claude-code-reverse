/**
 * Merges deleted configuration entries into their respective config objects and cleans up the deleted entries from the config object.
 *
 * @param {Object} configObject - The configuration object containing deleted and active entries for gates, configs, and layers.
 * @returns {Object} The cleaned configuration object with deleted entries merged and removed.
 */
function mergeAndCleanConfigEntries(configObject) {
  // Create a reference to the config object to operate on
  const updatedConfig = configObject;

  // Merge deleted gates into feature gates, then remove deleted_gates
  removePropertiesFromObject(configObject.deleted_gates, updatedConfig.feature_gates);
  delete updatedConfig.deleted_gates;

  // Merge deleted configs into dynamic configs, then remove deleted_configs
  removePropertiesFromObject(configObject.deleted_configs, updatedConfig.dynamic_configs);
  delete updatedConfig.deleted_configs;

  // Merge deleted layers into layer configs, then remove deleted_layers
  removePropertiesFromObject(configObject.deleted_layers, updatedConfig.layer_configs);
  delete updatedConfig.deleted_layers;

  // Return the cleaned and merged config object
  return updatedConfig;
}

module.exports = mergeAndCleanConfigEntries;