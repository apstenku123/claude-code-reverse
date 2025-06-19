/**
 * Maps the properties of a source object to a plain object based on a field definition array,
 * resolving enum values if necessary. Skips fields named 'uninterpretedOption'.
 *
 * @param {Object} sourceObject - The object containing values to map.
 * @param {Object} fieldConfig - The configuration object containing a _fieldsArray and fieldsArray.
 * @returns {Object|undefined} a plain object mapping field names to values, or undefined if no fields matched.
 */
function mapFieldsToObject(sourceObject, fieldConfig) {
  if (!sourceObject) return;

  const mappedFields = [];

  // Iterate over each field definition in the config
  for (let fieldIndex = 0; fieldIndex < fieldConfig.fieldsArray.length; ++fieldIndex) {
    const fieldDefinition = fieldConfig._fieldsArray[fieldIndex];
    const fieldName = fieldDefinition.name;

    // Skip fields named 'uninterpretedOption'
    if (fieldName === "uninterpretedOption") continue;

    // Only process fields that exist on the source object
    if (Object.prototype.hasOwnProperty.call(sourceObject, fieldName)) {
      let fieldValue = sourceObject[fieldName];

      // If the field is an enum (resolvedType is instance of CN),
      // and the value is a number, map isBlobOrFileLikeObject to its enum string if possible
      if (
        fieldDefinition.resolvedType instanceof CN &&
        typeof fieldValue === "number" &&
        fieldDefinition.resolvedType.valuesById[fieldValue] !== undefined
      ) {
        fieldValue = fieldDefinition.resolvedType.valuesById[fieldValue];
      }

      // s86 presumably serializes or transforms the field name as needed
      mappedFields.push(s86(fieldName), fieldValue);
    }
  }

  // If any fields were mapped, convert the array to an object using RD.util.toObject
  return mappedFields.length ? RD.util.toObject(mappedFields) : undefined;
}

module.exports = mapFieldsToObject;