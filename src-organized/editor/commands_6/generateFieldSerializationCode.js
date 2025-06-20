/**
 * Generates code snippets for serializing a protobuf field based on its type and options.
 *
 * @param {function} codeEmitter - Function to emit code snippets (acts as a code builder).
 * @param {object} fieldDescriptor - Protobuf field descriptor object (may have .type, .resolvedType, etc).
 * @param {number} typeIndex - Index of the field'createInteractionAccessor type in the types array.
 * @param {string|number} fieldIndex - Unique identifier or index for the field (used in code templates).
 * @returns {function} The codeEmitter function after emitting the appropriate code.
 */
function generateFieldSerializationCode(codeEmitter, fieldDescriptor, typeIndex, fieldIndex) {
  // If the field has a resolved type (e.g., enum or message)
  if (fieldDescriptor.resolvedType) {
    // If the resolved type is an enum (instanceof Ls)
    if (fieldDescriptor.resolvedType instanceof Ls) {
      // Emit code for serializing enum fields, handling string enums and undefined values
      codeEmitter(
        "d%createInteractionAccessor=processSubLanguageHighlighting.enums===String?(types[%i].values[m%createInteractionAccessor]===undefined?m%createInteractionAccessor:types[%i].values[m%createInteractionAccessor]):m%createInteractionAccessor",
        fieldIndex, typeIndex, fieldIndex, fieldIndex, typeIndex, fieldIndex, fieldIndex
      );
    } else {
      // Otherwise, treat as a message type and call its toObject method
      codeEmitter(
        "d%createInteractionAccessor=types[%i].toObject(m%createInteractionAccessor,processSubLanguageHighlighting)",
        fieldIndex, typeIndex, fieldIndex
      );
    }
  } else {
    // For primitive types
    let isUnsigned = false;
    switch (fieldDescriptor.type) {
      case "double":
      case "float":
        // Handle floating point types, converting non-finite numbers to strings if JSON output is requested
        codeEmitter(
          "d%createInteractionAccessor=processSubLanguageHighlighting.json&&!isFinite(m%createInteractionAccessor)?String(m%createInteractionAccessor):m%createInteractionAccessor",
          fieldIndex, fieldIndex, fieldIndex, fieldIndex
        );
        break;
      case "uint64":
        isUnsigned = true;
        // fall through
      case "int64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        // Handle 64-bit integer types with support for string/number/Long output
        codeEmitter(`if(typeof m%createInteractionAccessor==="number")`, fieldIndex)
          ("d%createInteractionAccessor=processSubLanguageHighlighting.longs===String?String(m%createInteractionAccessor):m%createInteractionAccessor", fieldIndex, fieldIndex, fieldIndex)
          ("else")
          (
            "d%createInteractionAccessor=processSubLanguageHighlighting.longs===String?util.Long.prototype.toString.call(m%createInteractionAccessor):processSubLanguageHighlighting.longs===Number?new util.LongBits(m%createInteractionAccessor.low>>>0,m%createInteractionAccessor.high>>>0).toNumber(%createInteractionAccessor):m%createInteractionAccessor",
            fieldIndex, fieldIndex, fieldIndex, fieldIndex, isUnsigned ? "true" : "", fieldIndex
          );
        break;
      case "bytes":
        // Handle bytes fields, supporting string, array, or raw output
        codeEmitter(
          "d%createInteractionAccessor=processSubLanguageHighlighting.bytes===String?util.base64.encode(m%createInteractionAccessor,0,m%createInteractionAccessor.length):processSubLanguageHighlighting.bytes===Array?Array.prototype.slice.call(m%createInteractionAccessor):m%createInteractionAccessor",
          fieldIndex, fieldIndex, fieldIndex, fieldIndex, fieldIndex
        );
        break;
      default:
        // Default: assign the field value directly
        codeEmitter("d%createInteractionAccessor=m%createInteractionAccessor", fieldIndex, fieldIndex);
        break;
    }
  }
  return codeEmitter;
}

module.exports = generateFieldSerializationCode;