/**
 * Registers common Google Protobuf types with the hg.common registry.
 *
 * This function retrieves various Google Protobuf type definitions from different modules
 * and registers them under specific names ("api", "descriptor", "source_context", "type")
 * using the hg.common function. This is typically used to ensure that these types are
 * available globally for serialization, deserialization, or other reflection-based operations.
 *
 * @returns {void} This function does not return a value.
 */
function registerGoogleProtobufCommonTypes() {
  // Retrieve the API protobuf definitions
  const apiProtobuf = $executeSqlWithSyntaxErrorRecovery();
  // Retrieve the Descriptor protobuf definitions
  const descriptorProtobuf = eg1();
  // Retrieve the SourceContext protobuf definitions
  const sourceContextProtobuf = q_0();
  // Retrieve the Type protobuf definitions
  const typeProtobuf = M_0();

  // Register each protobuf definition under its respective name in the hg.common registry
  hg.common("api", apiProtobuf.nested.google.nested.protobuf.nested);
  hg.common("descriptor", descriptorProtobuf.nested.google.nested.protobuf.nested);
  hg.common("source_context", sourceContextProtobuf.nested.google.nested.protobuf.nested);
  hg.common("type", typeProtobuf.nested.google.nested.protobuf.nested);
}

module.exports = registerGoogleProtobufCommonTypes;