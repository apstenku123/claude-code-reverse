/**
 * Converts a message object into a plain JavaScript object based on the provided message type definition.
 * Only includes fields defined in the type and skips 'uninterpretedOption' fields.
 * Handles enum value conversion if the field is an enum type.
 *
 * @param {Object} message - The source message object to convert.
 * @param {Object} messageType - The message type definition, containing field metadata.
 * @returns {Object|undefined} a plain object representation of the message, or undefined if input is falsy or no fields are present.
 */
function convertMessageToObject(message, messageType) {
  if (!message) return;

  const objectFields = [];

  // Iterate over each field defined in the message type
  for (let fieldIndex = 0; fieldIndex < messageType.fieldsArray.length; ++fieldIndex) {
    const fieldDefinition = messageType._fieldsArray[fieldIndex];
    const fieldName = fieldDefinition.name;

    // Skip 'uninterpretedOption' fields
    if (fieldName === "uninterpretedOption") continue;

    // Only process fields that exist on the message object
    if (Object.prototype.hasOwnProperty.call(message, fieldName)) {
      let fieldValue = message[fieldName];

      // If the field is an enum type and the value is a number, convert to enum name
      if (
        fieldDefinition.resolvedType instanceof CN &&
        typeof fieldValue === "number" &&
        fieldDefinition.resolvedType.valuesById[fieldValue] !== undefined
      ) {
        fieldValue = fieldDefinition.resolvedType.valuesById[fieldValue];
      }

      // Push the field name (possibly transformed by s86) and its value
      objectFields.push(s86(fieldName), fieldValue);
    }
  }

  // Convert the flat array of [key1, value1, key2, value2, ...] to an object, or return undefined if empty
  return objectFields.length ? RD.util.toObject(objectFields) : undefined;
}

module.exports = convertMessageToObject;