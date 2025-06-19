/**
 * Merges deleted gate, config, and layer information from the source object into the corresponding properties of the config object, then removes the deleted_* properties from the config object.
 *
 * @param {Object} sourceObject - The object containing deleted gates, configs, and layers to be merged.
 * @returns {Object} The updated config object with merged data and deleted_* properties removed.
 */
function mergeAndCleanGateConfigLayers(sourceObject) {
  // Create a reference to the config object (same as sourceObject)
  const config = sourceObject;

  // Merge deleted gates into feature gates
  removePropertiesFromObject(sourceObject.deleted_gates, config.feature_gates);
  // Remove deleted_gates property after merging
  delete config.deleted_gates;

  // Merge deleted configs into dynamic configs
  removePropertiesFromObject(sourceObject.deleted_configs, config.dynamic_configs);
  // Remove deleted_configs property after merging
  delete config.deleted_configs;

  // Merge deleted layers into layer configs
  removePropertiesFromObject(sourceObject.deleted_layers, config.layer_configs);
  // Remove deleted_layers property after merging
  delete config.deleted_layers;

  // Return the cleaned and updated config object
  return config;
}

module.exports = mergeAndCleanGateConfigLayers;