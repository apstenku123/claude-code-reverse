/**
 * Resets internal metadata and removes encoding/decoding methods from a message type object.
 *
 * This utility function clears cached field and oneof arrays, and deletes the encode, decode, and verify methods
 * from the provided message type object. This is typically used to clean up or reset a message type definition
 * in a protocol buffer implementation.
 *
 * @param {Object} messageType - The message type object to reset.
 * @returns {Object} The same message type object, after its metadata and methods have been reset.
 */
function resetMessageTypeMetadata(messageType) {
  // Clear cached field and oneof arrays
  messageType._fieldsById = null;
  messageType._fieldsArray = null;
  messageType._oneofsArray = null;

  // Remove encode, decode, and verify methods if present
  delete messageType.encode;
  delete messageType.decode;
  delete messageType.verify;

  // Return the modified message type object
  return messageType;
}

module.exports = resetMessageTypeMetadata;
