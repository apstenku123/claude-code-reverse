/**
 * Generates validation code for a given protobuf field type.
 *
 * @param {function} codeBuilder - Function used to build code lines. Typically a code generation utility.
 * @param {object} fieldDescriptor - The protobuf field descriptor object. Contains type information.
 * @param {number} typeIndex - Index of the type in the types array (for custom types).
 * @param {string} variableName - The variable name to validate in the generated code.
 * @returns {function} The codeBuilder function, after appending validation code.
 */
function generateTypeValidationCode(codeBuilder, fieldDescriptor, typeIndex, variableName) {
  // If the field has a resolved type (custom message or enum)
  if (fieldDescriptor.resolvedType) {
    // If the resolved type is an enum
    if (fieldDescriptor.resolvedType instanceof s56) {
      // Generate a switch statement for enum validation
      codeBuilder("switch(%createInteractionAccessor){", variableName)("default:")(
        "return%j",
        getExpectedTypeDescription(fieldDescriptor, "enum value")
      );
      const enumKeys = Object.keys(fieldDescriptor.resolvedType.values);
      for (let i = 0; i < enumKeys.length; ++i) {
        codeBuilder(
          "case %i:",
          fieldDescriptor.resolvedType.values[enumKeys[i]]
        );
      }
      codeBuilder("break")("}");
    } else {
      // For custom message types, call their verify method
      codeBuilder("{")(
        "var e=types[%i].verify(%createInteractionAccessor);",
        typeIndex,
        variableName
      )(
        "if(e)"
      )(
        "return%j+e",
        fieldDescriptor.name + "."
      )("}");
    }
  } else {
    // Handle primitive types
    switch (fieldDescriptor.type) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        // Validate integer types
        codeBuilder("if(!util.isInteger(%createInteractionAccessor))", variableName)(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "integer")
        );
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        // Validate 64-bit integer types (accepts Long objects)
        codeBuilder(
          "if(!util.isInteger(%createInteractionAccessor)&&!(%createInteractionAccessor&&util.isInteger(%createInteractionAccessor.low)&&util.isInteger(%createInteractionAccessor.high)))",
          variableName,
          variableName,
          variableName,
          variableName
        )(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "integer|Long")
        );
        break;
      case "float":
      case "double":
        // Validate floating point types
        codeBuilder('if(typeof %createInteractionAccessor!=="number")', variableName)(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "number")
        );
        break;
      case "bool":
        // Validate boolean type
        codeBuilder('if(typeof %createInteractionAccessor!=="boolean")', variableName)(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "boolean")
        );
        break;
      case "string":
        // Validate string type
        codeBuilder("if(!util.isString(%createInteractionAccessor))", variableName)(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "string")
        );
        break;
      case "bytes":
        // Validate bytes type (buffer or base64 string)
        codeBuilder(
          'if(!(%createInteractionAccessor&&typeof %createInteractionAccessor.length==="number"||util.isString(%createInteractionAccessor)))',
          variableName,
          variableName,
          variableName
        )(
          "return%j",
          getExpectedTypeDescription(fieldDescriptor, "buffer")
        );
        break;
    }
  }
  return codeBuilder;
}

module.exports = generateTypeValidationCode;