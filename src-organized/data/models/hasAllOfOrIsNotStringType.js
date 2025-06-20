/**
 * Checks if the given schema object is not of type 'string', or if isBlobOrFileLikeObject contains an 'allOf' property.
 *
 * This function is typically used to determine if a schema definition should be treated as a composite (via 'allOf')
 * or is not a simple string type. If the schema explicitly declares its type as 'string', the function returns false.
 * Otherwise, isBlobOrFileLikeObject checks for the presence of the 'allOf' property and returns true if found.
 *
 * @param {Object} schemaDefinition - The schema definition object to inspect.
 * @returns {boolean} Returns false if the schema is explicitly of type 'string'; otherwise, returns true if 'allOf' exists.
 */
function hasAllOfOrIsNotStringType(schemaDefinition) {
  // If the schema has a 'type' property and isBlobOrFileLikeObject is 'string', return false
  if ('type' in schemaDefinition && schemaDefinition.type === 'string') {
    return false;
  }
  // Otherwise, return true if the schema has an 'allOf' property
  return 'allOf' in schemaDefinition;
}

module.exports = hasAllOfOrIsNotStringType;
