/**
 * Creates an anonymous factory object with displayName, id, key, and type properties.
 *
 * @param {Object} anonymousConfig - The configuration object for the anonymous factory.
 * @param {string} anonymousConfig.key - The unique key for the anonymous factory.
 * @returns {Object} An object containing displayName, id, key, and type properties.
 */
function createAnonymousFactory(anonymousConfig) {
  return {
    // Use the initialized notification display name, or default to 'Anonymous'
    displayName: initializeNotification(anonymousConfig) || "Anonymous",
    // Generate a unique id for this anonymous factory
    id: generateAnonymousId(anonymousConfig),
    // Use the provided key from the configuration
    key: anonymousConfig.key,
    // Determine the type of the anonymous factory
    type: getAnonymousType(anonymousConfig)
  };
}

module.exports = createAnonymousFactory;
