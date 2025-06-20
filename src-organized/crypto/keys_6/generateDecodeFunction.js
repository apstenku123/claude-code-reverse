/**
 * Generates a decoder function for a given protobuf message type definition.
 * This function dynamically creates code to decode binary data into a message instance,
 * handling maps, repeated fields, required fields, and nested/grouped types.
 *
 * @param {Object} messageType - The protobuf message type definition object.
 * @returns {Function} - The generated decode function for the message type.
 */
function generateDecodeFunction(messageType) {
  // Create a code generator for the decode function
  const codegen = xS0.codegen(["reader", "length"], messageType.name + "$decode");

  // Ensure the reader is a Reader instance
  codegen("if (!(reader instanceof Reader))");
  codegen("reader = Reader.create(reader)");

  // Prepare constructor and local variables for decoding
  const hasMapFields = messageType.fieldsArray.some(field => field.map);
  codegen(
    `var end = length === undefined ? reader.len : reader.pos + length, ` +
    `message = new this.ctor${hasMapFields ? ", key, value" : ""}`
  );

  // Main decoding loop
  codegen("while (reader.pos < end) {");
  codegen("  var tag = reader.uint32();");

  // Handle group end if applicable
  if (messageType.group) {
    codegen("  if ((tag & 7) === 4)");
    codegen("    break;");
  }

  // Switch on field number
  codegen("  switch (tag >>> 3) {");

  // Generate case for each field
  for (let fieldIndex = 0; fieldIndex < messageType.fieldsArray.length; ++fieldIndex) {
    const field = messageType._fieldsArray[fieldIndex].resolve();
    const fieldType = field.resolvedType instanceof i56 ? "int32" : field.type;
    const messageFieldProp = "message" + xS0.safeProp(field.name);

    codegen(`    case ${field.id}: {`);

    if (field.map) {
      // Map field decoding
      codegen(`      if (${messageFieldProp} === util.emptyObject)`);
      codegen(`        ${messageFieldProp} = {}`);
      codegen("      var mapEnd = reader.uint32() + reader.pos;");
      if (JN.defaults[field.keyType] !== undefined) {
        codegen(`      key = ${JSON.stringify(JN.defaults[field.keyType])}`);
      } else {
        codegen("      key = null");
      }
      if (JN.defaults[fieldType] !== undefined) {
        codegen(`      value = ${JSON.stringify(JN.defaults[fieldType])}`);
      } else {
        codegen("      value = null");
      }
      codegen("      while (reader.pos < mapEnd) {");
      codegen("        var mapTag = reader.uint32();");
      codegen("        switch (mapTag >>> 3) {");
      codegen(`          case 1: key = reader.${field.keyType}(); break;`);
      codegen("          case 2:");
      if (JN.basic[fieldType] === undefined) {
        codegen(`            value = types[${fieldIndex}].decode(reader, reader.uint32());`);
      } else {
        codegen(`            value = reader.${fieldType}();`);
      }
      codegen("            break;");
      codegen("          default:");
      codegen("            reader.skipType(mapTag & 7);");
      codegen("            break;");
      codegen("        }");
      codegen("      }");
      if (JN.long[field.keyType] !== undefined) {
        codegen(
          `${messageFieldProp}[typeof key === \"object\" ? util.longToHash(key) : key] = value;`
        );
      } else {
        codegen(`${messageFieldProp}[key] = value;`);
      }
    } else if (field.repeated) {
      // Repeated field decoding
      codegen(`      if (!(${messageFieldProp} && ${messageFieldProp}.length))`);
      codegen(`        ${messageFieldProp} = [];`);
      if (JN.packed[fieldType] !== undefined) {
        codegen("      if ((tag & 7) === 2) {");
        codegen("        var packedEnd = reader.uint32() + reader.pos;");
        codegen(`        while (reader.pos < packedEnd) ${messageFieldProp}.push(reader.${fieldType}());`);
        codegen("      } else");
      }
      if (JN.basic[fieldType] === undefined) {
        if (field.resolvedType.group) {
          codegen(`        ${messageFieldProp}.push(types[${fieldIndex}].decode(reader));`);
        } else {
          codegen(`        ${messageFieldProp}.push(types[${fieldIndex}].decode(reader, reader.uint32()));`);
        }
      } else {
        codegen(`        ${messageFieldProp}.push(reader.${fieldType}());`);
      }
    } else if (JN.basic[fieldType] === undefined) {
      // Nested or group field decoding
      if (field.resolvedType.group) {
        codegen(`      ${messageFieldProp} = types[${fieldIndex}].decode(reader);`);
      } else {
        codegen(`      ${messageFieldProp} = types[${fieldIndex}].decode(reader, reader.uint32());`);
      }
    } else {
      // Basic field decoding
      codegen(`      ${messageFieldProp} = reader.${fieldType}();`);
    }
    codegen("      break;");
    codegen("    }");
  }

  // Default case: skip unknown field
  codegen("    default:");
  codegen("      reader.skipType(tag & 7);");
  codegen("      break;");
  codegen("  }");
  codegen("}");

  // Check for missing required fields
  for (let fieldIndex = 0; fieldIndex < messageType._fieldsArray.length; ++fieldIndex) {
    const field = messageType._fieldsArray[fieldIndex];
    if (field.required) {
      codegen(`if (!message.hasOwnProperty(${JSON.stringify(field.name)}))`);
      codegen(`  throw util.ProtocolError(${JSON.stringify(getMissingRequiredFieldMessage(field))}, {instance: message});`);
    }
  }

  // Return the decoded message
  codegen("return message;");

  // Return the generated function
  return codegen;
}

module.exports = generateDecodeFunction;