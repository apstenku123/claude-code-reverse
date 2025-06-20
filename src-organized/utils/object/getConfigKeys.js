/**
 * Retrieves the list of property names (keys) from the configuration object.
 *
 * @returns {string[]} An array containing the keys of the configuration object.
 */
function getConfigKeys() {
  // Return all enumerable property names of the configuration object
  return Object.keys(config);
}

module.exports = getConfigKeys;