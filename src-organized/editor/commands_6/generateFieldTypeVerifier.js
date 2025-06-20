/**
 * Generates verification code for a protobuf field type, handling enums, messages, and primitive types.
 *
 * @param {function} codeBuilder - Function for building code lines (e.g., code generator context).
 * @param {object} fieldDescriptor - Field descriptor containing type information (may have resolvedType, name, type, etc.).
 * @param {number} typeIndex - Index of the type in the types array (used for message verification).
 * @param {string} variableName - Name of the variable to verify in the generated code.
 * @returns {function} The codeBuilder function, after appending verification code for the field.
 */
function generateFieldTypeVerifier(codeBuilder, fieldDescriptor, typeIndex, variableName) {
  // If the field has a resolvedType (enum or message)
  if (fieldDescriptor.resolvedType) {
    // Handle enum types
    if (fieldDescriptor.resolvedType instanceof s56) {
      codeBuilder("switch(%createInteractionAccessor){", variableName)
        ("default:")
        ("return%j", getExpectedTypeDescription(fieldDescriptor, "enum value"));
      // Add a case for each enum value
      const enumKeys = Object.keys(fieldDescriptor.resolvedType.values);
      for (let i = 0; i < enumKeys.length; ++i) {
        codeBuilder("case %i:", fieldDescriptor.resolvedType.values[enumKeys[i]]);
      }
      codeBuilder("break")("}");
    } else {
      // Handle message types: verify using the type'createInteractionAccessor verify method
      codeBuilder("{")
        ("var e=types[%i].verify(%createInteractionAccessor);", typeIndex, variableName)
        ("if(e)")
        ("return%j+e", fieldDescriptor.name + ".")
        ("}");
    }
  } else {
    // Handle primitive types
    switch (fieldDescriptor.type) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        codeBuilder("if(!util.isInteger(%createInteractionAccessor))", variableName)
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "integer"));
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        codeBuilder(
          "if(!util.isInteger(%createInteractionAccessor)&&!(%createInteractionAccessor&&util.isInteger(%createInteractionAccessor.low)&&util.isInteger(%createInteractionAccessor.high)))",
          variableName, variableName, variableName, variableName
        )
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "integer|Long"));
        break;
      case "float":
      case "double":
        codeBuilder('if(typeof %createInteractionAccessor!=="number")', variableName)
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "number"));
        break;
      case "bool":
        codeBuilder('if(typeof %createInteractionAccessor!=="boolean")', variableName)
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "boolean"));
        break;
      case "string":
        codeBuilder("if(!util.isString(%createInteractionAccessor))", variableName)
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "string"));
        break;
      case "bytes":
        codeBuilder(
          'if(!(%createInteractionAccessor&&typeof %createInteractionAccessor.length==="number"||util.isString(%createInteractionAccessor)))',
          variableName, variableName, variableName
        )
          ("return%j", getExpectedTypeDescription(fieldDescriptor, "buffer"));
        break;
    }
  }
  return codeBuilder;
}

module.exports = generateFieldTypeVerifier;