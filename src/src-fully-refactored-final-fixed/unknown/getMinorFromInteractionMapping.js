/**
 * Retrieves the 'minor' property from a new _M6 instance, which is constructed
 * using the provided interaction entries and configuration.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be mapped to route names.
 * @param {Object} config - Configuration object used for mapping interactions.
 * @returns {*} The 'minor' property from the constructed _M6 instance.
 */
function getMinorFromInteractionMapping(interactionEntries, config) {
  // Create a new _M6 instance using the provided interaction entries and configuration
  // and return its 'minor' property
  return new _M6(interactionEntries, config).minor;
}

module.exports = getMinorFromInteractionMapping;
