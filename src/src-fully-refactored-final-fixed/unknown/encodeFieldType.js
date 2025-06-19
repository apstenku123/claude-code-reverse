/**
 * Encodes a field type using the appropriate protobuf wire type encoding.
 *
 * Depending on whether the field is a group or not, this function generates the correct encoding string
 * for the field using the provided template processor.
 *
 * @param {function} templateProcessor - Function to process the encoding template string with arguments.
 * @param {object} fieldDescriptor - Field descriptor object, must have `resolvedType.group` and `id` properties.
 * @param {number} typeIndex - Index of the type in the types array.
 * @param {string} fieldValue - The value or variable name to encode.
 * @returns {any} The result of the template processor function, representing the encoded field.
 */
function encodeFieldType(templateProcessor, fieldDescriptor, typeIndex, fieldValue) {
  // Determine if the field is a protobuf group type
  const isGroup = fieldDescriptor.resolvedType.group;
  // Compute the field id for encoding
  const fieldId = fieldDescriptor.id;

  if (isGroup) {
    // For group types, use wire types 3 (start group) and 4 (end group)
    return templateProcessor(
      "types[%i].encode(%createInteractionAccessor,processWithTransformedObservable.uint32(%i)).uint32(%i)",
      typeIndex,
      fieldValue,
      (fieldId << 3 | 3) >>> 0, // Start group wire type
      (fieldId << 3 | 4) >>> 0  // End group wire type
    );
  } else {
    // For non-group types, use wire type 2 (length-delimited)
    return templateProcessor(
      "types[%i].encode(%createInteractionAccessor,processWithTransformedObservable.uint32(%i).fork()).ldelim()",
      typeIndex,
      fieldValue,
      (fieldId << 3 | 2) >>> 0 // Length-delimited wire type
    );
  }
}

module.exports = encodeFieldType;