/**
 * Creates a new transport connection using the provided source object'createInteractionAccessor transport property.
 *
 * @param {Object} sourceObject - An object that contains a 'transport' property used to initialize the connection.
 * @returns {CO0} An instance of CO0 initialized with the provided transport.
 */
function createTransportConnection(sourceObject) {
  // Initialize and return a new CO0 connection using the transport from the source object
  return new CO0(sourceObject.transport);
}

module.exports = createTransportConnection;