/**
 * Retrieves the property names (keys) of the configuration object.
 *
 * @returns {string[]} An array containing the property names of the configuration object.
 */
function getConfigPropertyNames() {
  // Return all enumerable property names of the config object
  return Object.keys(config);
}

module.exports = getConfigPropertyNames;