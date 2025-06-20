/**
 * Generates a human-readable description of the expected type for a given field definition.
 *
 * @param {Object} fieldDefinition - The definition object for the field, containing metadata such as name, type, and modifiers.
 * @param {string} actualType - The actual type encountered (e.g., 'array', 'object', etc.).
 * @returns {string} a string describing the expected type for the field, including modifiers like repeated or map.
 */
function getExpectedTypeDescription(fieldDefinition, actualType) {
  // Start with the field name and the actual type
  let description = `${fieldDefinition.name}: ${actualType}`;

  // If the field is repeated and the actual type is not 'array', append '[]'
  if (fieldDefinition.repeated && actualType !== "array") {
    description += "[]";
  }
  // If the field is a map and the actual type is not 'object', append the key type
  else if (fieldDefinition.map && actualType !== "object") {
    description += `{k:${fieldDefinition.keyType}}`;
  }

  // Append ' expected' to indicate what was expected
  description += " expected";

  return description;
}

module.exports = getExpectedTypeDescription;