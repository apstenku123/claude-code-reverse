/**
 * Registers common Google Protobuf types with the global 'hg' registry.
 *
 * This function retrieves various Google Protobuf type definitions from different modules
 * and registers them under specific names using the 'hg.common' method. This setup is
 * typically used to ensure that these types are available globally for serialization,
 * deserialization, or other reflection-based operations.
 *
 * @returns {void} This function does not return a value.
 */
function registerProtobufCommonTypes() {
  // Retrieve the API Protobuf definitions
  const apiProtobuf = $executeSqlWithSyntaxErrorRecovery();
  // Retrieve the Descriptor Protobuf definitions
  const descriptorProtobuf = eg1();
  // Retrieve the SourceContext Protobuf definitions
  const sourceContextProtobuf = q_0();
  // Retrieve the Type Protobuf definitions
  const typeProtobuf = M_0();

  // Register the 'api' Protobuf type
  hg.common("api", apiProtobuf.nested.google.nested.protobuf.nested);
  // Register the 'descriptor' Protobuf type
  hg.common("descriptor", descriptorProtobuf.nested.google.nested.protobuf.nested);
  // Register the 'source_context' Protobuf type
  hg.common("source_context", sourceContextProtobuf.nested.google.nested.protobuf.nested);
  // Register the 'type' Protobuf type
  hg.common("type", typeProtobuf.nested.google.nested.protobuf.nested);
}

module.exports = registerProtobufCommonTypes;