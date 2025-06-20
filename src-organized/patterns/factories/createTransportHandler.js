/**
 * Creates a new transport handler instance using the provided source object'createInteractionAccessor transport property.
 *
 * @param {Object} sourceObject - An object containing a 'transport' property, typically representing a communication or data transport layer.
 * @returns {CO0} An instance of CO0 initialized with the provided transport.
 */
function createTransportHandler(sourceObject) {
  // Instantiate a new CO0 handler with the transport from the source object
  return new CO0(sourceObject.transport);
}

module.exports = createTransportHandler;