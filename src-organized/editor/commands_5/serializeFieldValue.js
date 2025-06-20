/**
 * Serializes a field value based on its type and options for object conversion.
 * Handles enums, primitive types, long integers, bytes, and custom types.
 *
 * @param {function} emitCode - Callback to emit code fragments for serialization.
 * @param {object} fieldDescriptor - Field descriptor containing type information.
 * @param {number} typeIndex - Index of the type in the types array.
 * @param {string|number} fieldIndex - Index or key for the field being serialized.
 * @returns {function} The emitCode function, after emitting the appropriate serialization code.
 */
function serializeFieldValue(emitCode, fieldDescriptor, typeIndex, fieldIndex) {
  // If the field has a resolved type (e.g., enum or custom type)
  if (fieldDescriptor.resolvedType) {
    // Handle enums
    if (fieldDescriptor.resolvedType instanceof Ls) {
      emitCode(
        "d%createInteractionAccessor=processSubLanguageHighlighting.enums===String?(types[%i].values[m%createInteractionAccessor]===undefined?m%createInteractionAccessor:types[%i].values[m%createInteractionAccessor]):m%createInteractionAccessor",
        fieldIndex, typeIndex, fieldIndex, fieldIndex, typeIndex, fieldIndex, fieldIndex
      );
    } else {
      // Handle custom message types
      emitCode(
        "d%createInteractionAccessor=types[%i].toObject(m%createInteractionAccessor,processSubLanguageHighlighting)",
        fieldIndex, typeIndex, fieldIndex
      );
    }
  } else {
    // For primitive types
    let isUnsignedLong = false;
    switch (fieldDescriptor.type) {
      case "double":
      case "float":
        // Serialize floating point numbers, handling non-finite values for JSON
        emitCode(
          "d%createInteractionAccessor=processSubLanguageHighlighting.json&&!isFinite(m%createInteractionAccessor)?String(m%createInteractionAccessor):m%createInteractionAccessor",
          fieldIndex, fieldIndex, fieldIndex, fieldIndex
        );
        break;
      case "uint64":
        isUnsignedLong = true;
        // fallthrough
      case "int64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        // Serialize 64-bit integers, supporting various output formats
        emitCode('if(typeof m%createInteractionAccessor==="number")', fieldIndex)
          ("d%createInteractionAccessor=processSubLanguageHighlighting.longs===String?String(m%createInteractionAccessor):m%createInteractionAccessor", fieldIndex, fieldIndex, fieldIndex)
          ("else")
          ("d%createInteractionAccessor=processSubLanguageHighlighting.longs===String?util.Long.prototype.toString.call(m%createInteractionAccessor):processSubLanguageHighlighting.longs===Number?new util.LongBits(m%createInteractionAccessor.low>>>0,m%createInteractionAccessor.high>>>0).toNumber(%createInteractionAccessor):m%createInteractionAccessor", fieldIndex, fieldIndex, fieldIndex, fieldIndex, isUnsignedLong ? "true" : "", fieldIndex);
        break;
      case "bytes":
        // Serialize bytes as base64 string, array, or raw
        emitCode(
          "d%createInteractionAccessor=processSubLanguageHighlighting.bytes===String?util.base64.encode(m%createInteractionAccessor,0,m%createInteractionAccessor.length):processSubLanguageHighlighting.bytes===Array?Array.prototype.slice.call(m%createInteractionAccessor):m%createInteractionAccessor",
          fieldIndex, fieldIndex, fieldIndex, fieldIndex, fieldIndex
        );
        break;
      default:
        // Default serialization for other primitive types
        emitCode("d%createInteractionAccessor=m%createInteractionAccessor", fieldIndex, fieldIndex);
        break;
    }
  }
  return emitCode;
}

module.exports = serializeFieldValue;