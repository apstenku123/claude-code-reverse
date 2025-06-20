/**
 * Resets specific internal fields and removes encode/decode/verify methods from a given protobuf-like object.
 *
 * This utility is typically used to clean up a protobuf message type object by:
 *   - Nullifying its internal field arrays (such as fields by updateSnapshotAndNotify, fields array, and oneofs array)
 *   - Deleting encode, decode, and verify methods from the object
 *
 * @param {Object} protoTypeObject - The protobuf-like object to be cleaned/reset.
 * @returns {Object} The same object, after fields are reset and methods removed.
 */
function resetProtoFieldsAndRemoveMethods(protoTypeObject) {
  // Nullify internal field arrays to reset the object'createInteractionAccessor field state
  protoTypeObject._fieldsById = null;
  protoTypeObject._fieldsArray = null;
  protoTypeObject._oneofsArray = null;

  // Remove encode, decode, and verify methods from the object
  delete protoTypeObject.encode;
  delete protoTypeObject.decode;
  delete protoTypeObject.verify;

  // Return the cleaned object
  return protoTypeObject;
}

module.exports = resetProtoFieldsAndRemoveMethods;
