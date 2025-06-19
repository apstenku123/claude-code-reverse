/**
 * Checks if the given schema object has an 'allOf' property, unless its 'type' property is 'string'.
 *
 * @param {Object} schema - The schema object to check.
 * @returns {boolean} Returns false if schema.type is 'string', otherwise true if schema has 'allOf' property, false otherwise.
 */
function hasAllOfUnlessStringType(schema) {
  // If the schema has a 'type' property and its value is 'string', return false
  if ('type' in schema && schema.type === 'string') {
    return false;
  }
  // Otherwise, return true if the schema has an 'allOf' property
  return 'allOf' in schema;
}

module.exports = hasAllOfUnlessStringType;
