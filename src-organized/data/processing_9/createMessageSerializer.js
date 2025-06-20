/**
 * Creates a serializer function for a given message type.
 *
 * @param {Object} messageType - The message type object, expected to have 'fromObject' and 'encode' methods, and a 'name' property.
 * @returns {Function} a function that takes a plain object, validates isBlobOrFileLikeObject, and returns the serialized message as a buffer or Uint8Array.
 *
 * @throws {Error} If the input is an array instead of an object.
 */
function createMessageSerializer(messageType) {
  return function serializeMessage(plainObject) {
    // Ensure the input is not an array, as handleMissingDoctypeError expect an object matching the message type structure
    if (Array.isArray(plainObject)) {
      throw new Error(
        `Failed to serialize message: expected object with ${messageType.name} structure, got array instead`
      );
    }
    // Convert the plain object to a message instance using the message type'createInteractionAccessor fromObject method
    const messageInstance = messageType.fromObject(plainObject);
    // Encode the message instance and finish to get the serialized buffer/Uint8Array
    return messageType.encode(messageInstance).finish();
  };
}

module.exports = createMessageSerializer;