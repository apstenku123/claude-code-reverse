/**
 * Checks if the provided array includes the host property of the config object.
 *
 * @param {string[]} sourceArray - The array of strings to search within.
 * @param {{ host: string } | undefined} config - An optional object that may contain a 'host' property.
 * @returns {boolean} True if config is provided and sourceArray includes config.host, otherwise false.
 */
function doesArrayIncludeHost(sourceArray, config) {
  // If config is provided, check if sourceArray includes config.host
  return config ? sourceArray.includes(config.host) : false;
}

module.exports = doesArrayIncludeHost;