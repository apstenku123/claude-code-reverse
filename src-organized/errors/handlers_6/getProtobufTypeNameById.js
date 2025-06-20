/**
 * Returns the Protobuf type name corresponding to a given numeric type identifier.
 *
 * @param {number} typeId - The numeric identifier for the Protobuf type.
 * @returns {string} The name of the Protobuf type.
 * @throws {Error} If the provided typeId does not correspond to a known Protobuf type.
 */
function getProtobufTypeNameById(typeId) {
  switch (typeId) {
    case 1:
      return "double";
    case 2:
      return "float";
    case 3:
      return "int64";
    case 4:
      return "uint64";
    case 5:
      return "int32";
    case 6:
      return "fixed64";
    case 7:
      return "fixed32";
    case 8:
      return "bool";
    case 9:
      return "string";
    case 12:
      return "bytes";
    case 13:
      return "uint32";
    case 15:
      return "sfixed32";
    case 16:
      return "sfixed64";
    case 17:
      return "sint32";
    case 18:
      return "sint64";
    default:
      // Throw an error if the typeId is not recognized
      throw new Error("illegal type: " + typeId);
  }
}

module.exports = getProtobufTypeNameById;