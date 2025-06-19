/**
 * Generates a result object containing a Protocol Buffer 3 DescriptorProto and related file descriptors.
 *
 * @param {Object} protoSource - An object that provides a toDescriptor method for proto3 serialization.
 * @param {any} fileDescriptorProtos - The file descriptor protos associated with the protoSource.
 * @returns {Object} An object with the proto3 descriptor, its type information, and the file descriptors.
 */
function createProto3DescriptorResult(protoSource, fileDescriptorProtos) {
  // Obtain the Protocol Buffer 3 descriptor from the source object
  const proto3Descriptor = protoSource.toDescriptor("proto3");

  return {
    format: "Protocol Buffer 3 DescriptorProto",
    // Convert the descriptor'createInteractionAccessor type to a plain object using the provided f_0 function
    type: proto3Descriptor.$type.toObject(proto3Descriptor, f_0),
    fileDescriptorProtos: fileDescriptorProtos
  };
}

module.exports = createProto3DescriptorResult;