/**
 * Generates a summary object containing a Protocol Buffer 3 DescriptorProto,
 * its type information, and associated file descriptor protos.
 *
 * @param {Object} protoSource - An object that provides a toDescriptor method for proto3 serialization.
 * @param {Array|Object} fileDescriptorProtos - The file descriptor protos associated with the protoSource.
 * @returns {Object} An object summarizing the proto3 descriptor, its type, and file descriptor protos.
 */
function createProto3DescriptorSummary(protoSource, fileDescriptorProtos) {
  // Generate the Protocol Buffer 3 descriptor from the source object
  const proto3Descriptor = protoSource.toDescriptor("proto3");

  // Build and return the summary object
  return {
    format: "Protocol Buffer 3 DescriptorProto",
    // Convert the descriptor'createInteractionAccessor type to a plain JS object using the provided f_0 function
    type: proto3Descriptor.$type.toObject(proto3Descriptor, f_0),
    fileDescriptorProtos: fileDescriptorProtos
  };
}

module.exports = createProto3DescriptorSummary;