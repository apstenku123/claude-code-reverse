/**
 * Generates a code expression for encoding a protobuf type field, handling both group and non-group types.
 *
 * @param {function} codeTemplateFn - Function that formats and returns the code string (e.g., a template function).
 * @param {object} fieldDescriptor - Field descriptor object, must have 'resolvedType' and 'id' properties.
 * @param {number} typeIndex - Index of the type in the types array.
 * @param {string} valueIdentifier - Variable name or expression representing the value to encode.
 * @returns {string} Generated code expression for encoding the field.
 */
function generateTypeEncodingExpression(codeTemplateFn, fieldDescriptor, typeIndex, valueIdentifier) {
  // Calculate wire type values for protobuf encoding
  const fieldId = fieldDescriptor.id;
  const groupStartWireType = 3; // Wire type for start group
  const groupEndWireType = 4;   // Wire type for end group
  const lengthDelimitedWireType = 2; // Wire type for length-delimited

  // Compute tag values using protobuf encoding rules
  const groupStartTag = (fieldId << 3 | groupStartWireType) >>> 0;
  const groupEndTag = (fieldId << 3 | groupEndWireType) >>> 0;
  const lengthDelimitedTag = (fieldId << 3 | lengthDelimitedWireType) >>> 0;

  // If the field is a group type, use group encoding
  if (fieldDescriptor.resolvedType.group) {
    // Example output: types[0].encode(value, processWithTransformedObservable.uint32(26)).uint32(29)
    return codeTemplateFn(
      "types[%i].encode(%createInteractionAccessor,processWithTransformedObservable.uint32(%i)).uint32(%i)",
      typeIndex,
      valueIdentifier,
      groupStartTag,
      groupEndTag
    );
  } else {
    // For non-group types, use length-delimited encoding
    // Example output: types[0].encode(value, processWithTransformedObservable.uint32(18).fork()).ldelim()
    return codeTemplateFn(
      "types[%i].encode(%createInteractionAccessor,processWithTransformedObservable.uint32(%i).fork()).ldelim()",
      typeIndex,
      valueIdentifier,
      lengthDelimitedTag
    );
  }
}

module.exports = generateTypeEncodingExpression;