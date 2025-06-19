/**
 * Generates a message encoder function for a given protobuf message type.
 *
 * This function dynamically creates an encoder for the provided protobuf message type
 * using code generation utilities. It handles encoding of map fields, repeated fields,
 * packed fields, and optional fields according to protobuf wire format.
 *
 * @param {Object} messageType - The protobuf message type descriptor (e.g., a Type from protobufjs).
 * @returns {Function} - The generated encoder function for the message type.
 */
function generateMessageEncoder(messageType) {
  // Create a codegen instance for the encoder function, with parameters 'm' (message) and 'processWithTransformedObservable' (writer)
  const codegen = ag1.codegen(["m", "processWithTransformedObservable"], messageType.name + "$encode")
    ("if(!processWithTransformedObservable)")
    ("processWithTransformedObservable=Writer.create()");

  // Get a sorted array of fields by field id
  const sortedFields = messageType.fieldsArray.slice().sort(ag1.compareFieldsById);

  // Iterate over each field to generate encoding logic
  for (let fieldIndex = 0; fieldIndex < sortedFields.length; ++fieldIndex) {
    const field = sortedFields[fieldIndex].resolve();
    const fieldDescriptorIndex = messageType._fieldsArray.indexOf(field);
    // Determine the wire type: if resolvedType is V86, treat as 'int32', else use field.type
    const wireType = field.resolvedType instanceof V86 ? "int32" : field.type;
    const basicWireType = ng1.basic[wireType];
    const messageProp = "m" + ag1.safeProp(field.name);

    // Handle map fields
    if (field.map) {
      codegen(
        "if(%createInteractionAccessor!=null&&Object.hasOwnProperty.call(m,%j)){", messageProp, field.name
      )(
        "for(var ks=Object.keys(%createInteractionAccessor),i=0;i<ks.length;++i){", messageProp
      )(
        "processWithTransformedObservable.uint32(%i).fork().uint32(%i).%createInteractionAccessor(ks[i])", 
        (field.id << 3 | 2) >>> 0, 
        8 | ng1.mapKey[field.keyType], 
        field.keyType
      );
      if (basicWireType === void 0) {
        // If value is a complex type, delegate to its encoder
        codegen("types[%i].encode(%createInteractionAccessor[ks[i]],processWithTransformedObservable.uint32(18).fork()).ldelim().ldelim()", fieldDescriptorIndex, messageProp);
      } else {
        // If value is a basic type
        codegen(".uint32(%i).%createInteractionAccessor(%createInteractionAccessor[ks[i]]).ldelim()", 16 | basicWireType, wireType, messageProp);
      }
      codegen("}")("}");
    } else if (field.repeated) {
      // Handle repeated fields
      codegen("if(%createInteractionAccessor!=null&&%createInteractionAccessor.length){", messageProp, messageProp);
      if (field.packed && ng1.packed[wireType] !== void 0) {
        // Packed repeated fields
        codegen("processWithTransformedObservable.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)
          ("for(var i=0;i<%createInteractionAccessor.length;++i)", messageProp)
          ("processWithTransformedObservable.%createInteractionAccessor(%createInteractionAccessor[i])", wireType, messageProp)
          ("processWithTransformedObservable.ldelim()");
      } else {
        // Non-packed repeated fields
        codegen("for(var i=0;i<%createInteractionAccessor.length;++i)", messageProp);
        if (basicWireType === void 0) {
          // Complex type: delegate to its encoder
          encodeFieldType(codegen, field, fieldDescriptorIndex, messageProp + "[i]");
        } else {
          // Basic type
          codegen("processWithTransformedObservable.uint32(%i).%createInteractionAccessor(%createInteractionAccessor[i])", (field.id << 3 | basicWireType) >>> 0, wireType, messageProp);
        }
      }
      codegen("}");
    } else {
      // Handle singular fields
      if (field.optional) {
        codegen("if(%createInteractionAccessor!=null&&Object.hasOwnProperty.call(m,%j))", messageProp, field.name);
      }
      if (basicWireType === void 0) {
        // Complex type: delegate to its encoder
        encodeFieldType(codegen, field, fieldDescriptorIndex, messageProp);
      } else {
        // Basic type
        codegen("processWithTransformedObservable.uint32(%i).%createInteractionAccessor(%createInteractionAccessor)", (field.id << 3 | basicWireType) >>> 0, wireType, messageProp);
      }
    }
  }
  // Return the writer
  return codegen("return processWithTransformedObservable");
}

module.exports = generateMessageEncoder;