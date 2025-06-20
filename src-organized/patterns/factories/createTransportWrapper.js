/**
 * Creates a new CO0 instance using the provided object'createInteractionAccessor transport property.
 *
 * @param {Object} sourceObject - An object that contains a 'transport' property.
 * @returns {CO0} a new instance of CO0 initialized with the object'createInteractionAccessor transport.
 */
function createTransportWrapper(sourceObject) {
  // Instantiate and return a new CO0 using the transport property from the source object
  return new CO0(sourceObject.transport);
}

module.exports = createTransportWrapper;