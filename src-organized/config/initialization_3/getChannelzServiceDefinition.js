/**
 * Retrieves and caches the gRPC Channelz service definition from the compiled proto file.
 *
 * Loads the 'channelz.proto' file using the protobuf loader with specific options, then loads the package definition
 * and returns the Channelz service definition. Caches the result to avoid redundant loading on subsequent calls.
 *
 * @returns {object} The gRPC Channelz v1 service definition object.
 */
function getChannelzServiceDefinition() {
  // Return cached service definition if already loaded
  if (hZ1) {
    return hZ1;
  }

  // Load the protobuf loader'createInteractionAccessor loadSync function
  const { loadSync } = m_0();

  // Load the channelz.proto file with specific options
  const protoDefinition = loadSync("channelz.proto", {
    keepCase: true, // Preserve field case
    longs: String,  // Represent long values as strings
    enums: String,  // Represent enums as strings
    defaults: true, // Set default values
    oneofs: true,   // Include oneof fields
    includeDirs: [`${__dirname}/../../proto`] // Path to proto files
  });

  // Load the package definition and extract the Channelz service
  hZ1 = PB6.loadPackageDefinition(protoDefinition).grpc.channelz.v1.Channelz.service;

  return hZ1;
}

module.exports = getChannelzServiceDefinition;