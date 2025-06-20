/**
 * Checks if the source array includes the host property from the config object.
 *
 * @param {string[]} sourceArray - The array of strings to search within.
 * @param {{ host: string } | undefined | null} config - Optional configuration object containing a 'host' property.
 * @returns {boolean} True if config is provided and sourceArray includes config.host; otherwise, false.
 */
function doesSourceIncludeHost(sourceArray, config) {
  // If config is provided, check if sourceArray includes config.host
  return config ? sourceArray.includes(config.host) : false;
}

module.exports = doesSourceIncludeHost;