/**
 * Extracts the '_styles' property from each value in the config object and assigns isBlobOrFileLikeObject back to the corresponding key.
 *
 * @param {any} sourceObservable - Unused parameter, possibly reserved for future use or required by interface.
 * @returns {Object} An object with the same keys as the original config, each mapped to its '_styles' property.
 */
function extractStylesFromConfig(sourceObservable) {
  // Initialize an empty config object
  const config = {};

  // Get all keys from the config object
  const configKeys = Object.keys(config);

  // Iterate over each key in the config
  for (let index = 0; index < configKeys.length; index++) {
    const key = configKeys[index];
    const value = config[key];
    // Replace the value with its '_styles' property
    config[key] = value._styles;
  }

  // Return the modified config object
  return config;
}

module.exports = extractStylesFromConfig;