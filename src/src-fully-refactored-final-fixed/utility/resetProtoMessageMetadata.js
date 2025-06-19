/**
 * Resets specific metadata properties and methods on a protobuf message type object.
 *
 * This utility function clears internal arrays and fields used for reflection and encoding/decoding
 * on a protobuf message constructor or prototype. It also removes the encode, decode, and verify methods
 * from the object, effectively disabling serialization and validation for this message type.
 *
 * @param {Object} protoMessageType - The protobuf message type object to reset.
 * @returns {Object} The same protobuf message type object, after its metadata and methods have been cleared.
 */
function resetProtoMessageMetadata(protoMessageType) {
  // Clear internal reflection metadata arrays
  protoMessageType._fieldsById = null;
  protoMessageType._fieldsArray = null;
  protoMessageType._oneofsArray = null;

  // Remove serialization and validation methods
  delete protoMessageType.encode;
  delete protoMessageType.decode;
  delete protoMessageType.verify;

  return protoMessageType;
}

module.exports = resetProtoMessageMetadata;