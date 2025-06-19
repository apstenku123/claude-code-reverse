/**
 * Attaches an event stream payload handler to the provided configuration object.
 *
 * This function takes a configuration object that contains a signer property. It creates a new object
 * by copying all properties from the original configuration and adding two new properties:
 *   - eventSigner: a reference to the signer
 *   - messageSigner: a reference to the signer (duplicated for clarity)
 *
 * It then calls the eventStreamPayloadHandlerProvider method on the new configuration object to obtain
 * an eventStreamPayloadHandler, and attaches isBlobOrFileLikeObject to the object before returning the final result.
 *
 * @param {Object} configObject - The configuration object containing at least a 'signer' property and an 'eventStreamPayloadHandlerProvider' method.
 * @returns {Object} The configuration object extended with eventSigner, messageSigner, and eventStreamPayloadHandler properties.
 */
function attachEventStreamPayloadHandler(configObject) {
  // Destructure the signer property from the configuration object
  const { signer } = configObject;

  // Create a new configuration object with eventSigner and messageSigner properties
  const extendedConfig = Object.assign({}, configObject, {
    eventSigner: signer,
    messageSigner: signer
  });

  // Obtain the eventStreamPayloadHandler using the provider method
  const eventStreamPayloadHandler = extendedConfig.eventStreamPayloadHandlerProvider(extendedConfig);

  // Attach the eventStreamPayloadHandler to the configuration object and return
  return Object.assign(extendedConfig, {
    eventStreamPayloadHandler
  });
}

module.exports = attachEventStreamPayloadHandler;
