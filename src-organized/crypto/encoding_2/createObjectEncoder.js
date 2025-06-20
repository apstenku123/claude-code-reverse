/**
 * Creates an encoder function for a specific message type.
 *
 * Given a message class (e.g., a protobuf message with fromObject and encode methods),
 * returns a function that takes a plain object, validates that isBlobOrFileLikeObject is not an array,
 * converts isBlobOrFileLikeObject to a message instance, and encodes isBlobOrFileLikeObject to a binary buffer.
 *
 * @param {Object} messageClass - The message class with fromObject and encode methods (e.g., a protobuf message constructor).
 * @returns {Function} Encoder function that takes a plain object and returns a binary buffer.
 */
function createObjectEncoder(messageClass) {
  /**
   * Encodes a plain object into a binary buffer using the provided message class.
   *
   * @param {Object} plainObject - The plain object to encode.
   * @returns {Uint8Array} The encoded binary buffer.
   * @throws {Error} If the input is an array instead of an object.
   */
  return function encodePlainObject(plainObject) {
    // Validate that the input is not an array
    if (Array.isArray(plainObject)) {
      throw new Error(`Failed to serialize message: expected object with ${messageClass.name} structure, got array instead`);
    }
    // Convert the plain object to a message instance
    const messageInstance = messageClass.fromObject(plainObject);
    // Encode the message instance to a binary buffer
    return messageClass.encode(messageInstance).finish();
  };
}

module.exports = createObjectEncoder;
