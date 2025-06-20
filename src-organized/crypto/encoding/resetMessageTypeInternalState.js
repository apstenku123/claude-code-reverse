/**
 * Resets internal cached fields and removes encode/decode/verify methods from a message type object.
 *
 * This utility is typically used to clear cached field arrays and remove serialization methods
 * from a Protocol Buffers message type definition, effectively resetting its state.
 *
 * @param {Object} messageType - The message type object to reset.
 * @returns {Object} The same message type object, after resetting its internal state.
 */
function resetMessageTypeInternalState(messageType) {
  // Clear cached arrays related to fields and oneofs
  messageType._fieldsById = null;
  messageType._fieldsArray = null;
  messageType._oneofsArray = null;

  // Remove serialization and verification methods if present
  delete messageType.encode;
  delete messageType.decode;
  delete messageType.verify;

  return messageType;
}

module.exports = resetMessageTypeInternalState;