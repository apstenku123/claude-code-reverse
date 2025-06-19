/**
 * Creates a Protocol Buffer 3 EnumDescriptorProto object from a source descriptor and file descriptors.
 *
 * @param {Object} sourceDescriptor - An object that provides a toDescriptor method for proto3 serialization.
 * @param {Array} fileDescriptorProtos - An array of file descriptor protos to include in the result.
 * @returns {Object} An object containing the format, type, and fileDescriptorProtos.
 */
function createProto3EnumDescriptor(sourceDescriptor, fileDescriptorProtos) {
  // Convert the source descriptor to a proto3 descriptor object
  const proto3Descriptor = sourceDescriptor.toDescriptor("proto3");

  // Build and return the descriptor object
  return {
    format: "Protocol Buffer 3 EnumDescriptorProto",
    // Convert the $type property to a plain object using the provided f_0 function
    type: proto3Descriptor.$type.toObject(proto3Descriptor, f_0),
    fileDescriptorProtos: fileDescriptorProtos
  };
}

module.exports = createProto3EnumDescriptor;