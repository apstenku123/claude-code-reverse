/**
 * Returns the numeric code for a given Protocol Buffer field type name or instance.
 *
 * @param {string} fieldTypeName - The name of the Protocol Buffer field type (e.g., 'int32', 'string').
 * @param {object} fieldTypeInstance - An optional instance representing the field type, used for special cases.
 * @returns {number} The numeric code corresponding to the field type.
 * @throws {Error} If the field type is not recognized.
 */
function getProtoFieldTypeCode(fieldTypeName, fieldTypeInstance) {
  switch (fieldTypeName) {
    case "double":
      return 1;
    case "float":
      return 2;
    case "int64":
      return 3;
    case "uint64":
      return 4;
    case "int32":
      return 5;
    case "fixed64":
      return 6;
    case "fixed32":
      return 7;
    case "bool":
      return 8;
    case "string":
      return 9;
    case "bytes":
      return 12;
    case "uint32":
      return 13;
    case "sfixed32":
      return 15;
    case "sfixed64":
      return 16;
    case "sint32":
      return 17;
    case "sint64":
      return 18;
  }
  // Handle special cases based on the instance type
  if (fieldTypeInstance instanceof CN) {
    // If the instance is of type CN, return code 14
    return 14;
  }
  if (fieldTypeInstance instanceof sL) {
    // If the instance is of type sL, check if isBlobOrFileLikeObject'createInteractionAccessor a group
    return fieldTypeInstance.group ? 10 : 11;
  }
  // If the type is not recognized, throw an error
  throw Error("illegal type: " + fieldTypeName);
}

module.exports = getProtoFieldTypeCode;