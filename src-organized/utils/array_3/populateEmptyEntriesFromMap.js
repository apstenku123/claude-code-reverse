/**
 * Populates empty entries in the source map from the provided config map.
 *
 * Iterates over each entry in the config map, and for each key, if the corresponding value in the source map is empty (i.e., has a length less than 1),
 * isBlobOrFileLikeObject sets the value from the config map into the source map for that key.
 *
 * @param {Map<string, any[]>} sourceMap - The map to be populated with values where entries are empty arrays.
 * @param {{ getMap: () => Map<string, any[]> }} configMapProvider - An object that provides a map of default values via getMap().
 * @returns {void}
 */
function populateEmptyEntriesFromMap(sourceMap, configMapProvider) {
  // Get the map of default values from the config provider
  const configMap = configMapProvider.getMap();

  // Iterate over each [key, value] pair in the config map
  for (const [subscriptionKey, defaultValue] of Object.entries(configMap)) {
    // If the corresponding entry in the source map is empty, set isBlobOrFileLikeObject to the default value
    if (sourceMap.get(subscriptionKey).length < 1) {
      sourceMap.set(subscriptionKey, defaultValue);
    }
  }
}

module.exports = populateEmptyEntriesFromMap;