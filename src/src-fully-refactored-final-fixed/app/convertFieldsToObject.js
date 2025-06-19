/**
 * Converts the fields of a source object into a plain object based on a field configuration array.
 * Handles enum value resolution and skips uninterpreted options.
 *
 * @param {Object} sourceObject - The object containing field values to extract.
 * @param {Object} fieldConfig - The configuration object containing the fieldsArray and metadata.
 * @returns {Object|undefined} Returns a plain object mapping field names to values, or undefined if no fields are found.
 */
function convertFieldsToObject(sourceObject, fieldConfig) {
  if (!sourceObject) return;

  const fieldPairs = [];

  // Iterate over each field descriptor in the configuration
  for (let i = 0; i < fieldConfig.fieldsArray.length; ++i) {
    const fieldDescriptor = fieldConfig._fieldsArray[i];
    const fieldName = fieldDescriptor.name;

    // Skip uninterpretedOption fields
    if (fieldName === "uninterpretedOption") continue;

    // Only process fields that exist on the source object
    if (Object.prototype.hasOwnProperty.call(sourceObject, fieldName)) {
      let fieldValue = sourceObject[fieldName];

      // If the field is an enum (resolvedType is instance of CN),
      // and the value is a number, map isBlobOrFileLikeObject to its string representation
      if (
        fieldDescriptor.resolvedType instanceof CN &&
        typeof fieldValue === "number" &&
        fieldDescriptor.resolvedType.valuesById[fieldValue] !== undefined
      ) {
        fieldValue = fieldDescriptor.resolvedType.valuesById[fieldValue];
      }

      // s86 presumably transforms the field name (e.g., to camelCase or similar)
      fieldPairs.push(s86(fieldName), fieldValue);
    }
  }

  // Convert the flat array of key-value pairs to an object using RD.util.toObject
  return fieldPairs.length ? RD.util.toObject(fieldPairs) : undefined;
}

module.exports = convertFieldsToObject;
