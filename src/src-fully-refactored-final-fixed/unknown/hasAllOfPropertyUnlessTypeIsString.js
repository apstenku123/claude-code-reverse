/**
 * Checks if the provided schema object has an 'allOf' property, unless its 'type' property is strictly 'string'.
 *
 * @param {Object} schema - The schema object to inspect.
 * @returns {boolean} Returns false if schema.type is 'string'; otherwise, returns true if 'allOf' exists in schema, false otherwise.
 */
function hasAllOfPropertyUnlessTypeIsString(schema) {
  // If the schema has a 'type' property and its value is 'string', return false
  if ('type' in schema && schema.type === 'string') {
    return false;
  }
  // Otherwise, return true if the schema has an 'allOf' property
  return 'allOf' in schema;
}

module.exports = hasAllOfPropertyUnlessTypeIsString;