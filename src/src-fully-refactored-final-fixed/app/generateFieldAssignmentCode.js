/**
 * Generates code snippets to assign values to a message field based on its protobuf type.
 * Handles enums, messages, and primitive types, including repeated fields and default values.
 *
 * @param {function} codeWriter - Function to write code lines, supports string formatting.
 * @param {object} fieldDescriptor - Field descriptor containing type, resolvedType, repeated, typeDefault, and fullName.
 * @param {number} typeIndex - Index of the field'createInteractionAccessor type in the types array (for message fields).
 * @param {string|number} fieldVarName - Variable name or index for the field assignment (e.g., 'name', 1).
 * @returns {function} The codeWriter function, for chaining or further use.
 */
function generateFieldAssignmentCode(codeWriter, fieldDescriptor, typeIndex, fieldVarName) {
  let hasDefaultCase = false;

  // Handle fields with a resolved type (enum or message)
  if (fieldDescriptor.resolvedType) {
    // Enum type
    if (fieldDescriptor.resolvedType instanceof Ls) {
      codeWriter("switch(d%createInteractionAccessor){", fieldVarName);
      const enumValues = fieldDescriptor.resolvedType.values;
      const enumKeys = Object.keys(enumValues);
      for (let i = 0; i < enumKeys.length; ++i) {
        const enumKey = enumKeys[i];
        const enumValue = enumValues[enumKey];
        // Handle default enum value with a 'default' case
        if (enumValue === fieldDescriptor.typeDefault && !hasDefaultCase) {
          codeWriter("default:")
            ("if(typeof(d%createInteractionAccessor)===\"number\"){m%createInteractionAccessor=d%createInteractionAccessor;break}", fieldVarName, fieldVarName, fieldVarName);
          if (!fieldDescriptor.repeated) codeWriter("break");
          hasDefaultCase = true;
        }
        // Write case for each enum key and value
        codeWriter("case%j:", enumKey)
          ("case %i:", enumValue)
          ("m%createInteractionAccessor=%j", fieldVarName, enumValue)
          ("break");
      }
      codeWriter("}");
    } else {
      // Message type
      codeWriter('if(typeof d%createInteractionAccessor!=="object")', fieldVarName)
        ("throw TypeError(%j)", fieldDescriptor.fullName + ": object expected")
        ("m%createInteractionAccessor=types[%i].fromObject(d%createInteractionAccessor)", fieldVarName, typeIndex, fieldVarName);
    }
  } else {
    // Handle primitive types
    let isUnsigned = false;
    switch (fieldDescriptor.type) {
      case "double":
      case "float":
        codeWriter("m%createInteractionAccessor=Number(d%createInteractionAccessor)", fieldVarName, fieldVarName);
        break;
      case "uint32":
      case "fixed32":
        codeWriter("m%createInteractionAccessor=d%createInteractionAccessor>>>0", fieldVarName, fieldVarName);
        break;
      case "int32":
      case "sint32":
      case "sfixed32":
        codeWriter("m%createInteractionAccessor=d%createInteractionAccessor|0", fieldVarName, fieldVarName);
        break;
      case "uint64":
        isUnsigned = true;
      case "int64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        // Handle 64-bit integer types with Long support
        codeWriter("if(util.Long)")
          ("(m%createInteractionAccessor=util.Long.fromValue(d%createInteractionAccessor)).unsigned=%j", fieldVarName, fieldVarName, isUnsigned)
          ('else if(typeof d%createInteractionAccessor==="string")', fieldVarName)
          ("m%createInteractionAccessor=parseInt(d%createInteractionAccessor,10)", fieldVarName, fieldVarName)
          ('else if(typeof d%createInteractionAccessor==="number")', fieldVarName)
          ("m%createInteractionAccessor=d%createInteractionAccessor", fieldVarName, fieldVarName)
          ('else if(typeof d%createInteractionAccessor==="object")', fieldVarName)
          ("m%createInteractionAccessor=new util.LongBits(d%createInteractionAccessor.low>>>0,d%createInteractionAccessor.high>>>0).toNumber(%createInteractionAccessor)", fieldVarName, fieldVarName, fieldVarName, isUnsigned ? "true" : "");
        break;
      case "bytes":
        // Handle bytes: decode base64 string or assign buffer
        codeWriter('if(typeof d%createInteractionAccessor==="string")', fieldVarName)
          ("util.base64.decode(d%createInteractionAccessor,m%createInteractionAccessor=util.newBuffer(util.base64.length(d%createInteractionAccessor)),0)", fieldVarName, fieldVarName, fieldVarName)
          ("else if(d%createInteractionAccessor.length >= 0)", fieldVarName)
          ("m%createInteractionAccessor=d%createInteractionAccessor", fieldVarName, fieldVarName);
        break;
      case "string":
        codeWriter("m%createInteractionAccessor=String(d%createInteractionAccessor)", fieldVarName, fieldVarName);
        break;
      case "bool":
        codeWriter("m%createInteractionAccessor=Boolean(d%createInteractionAccessor)", fieldVarName, fieldVarName);
        break;
    }
  }
  return codeWriter;
}

module.exports = generateFieldAssignmentCode;