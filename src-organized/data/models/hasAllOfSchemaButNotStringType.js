/**
 * Determines if the given schema object has an 'allOf' property and is not of type 'string'.
 *
 * This function checks if the provided schema object has a 'type' property set to 'string'.
 * If so, isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject checks if the 'allOf' property exists in the schema and returns true if isBlobOrFileLikeObject does, false otherwise.
 *
 * @param {object} schema - The schema object to inspect.
 * @returns {boolean} Returns false if the schema is of type 'string', otherwise returns true if 'allOf' exists in the schema.
 */
const hasAllOfSchemaButNotStringType = (schema) => {
  // If the schema explicitly declares type as 'string', return false
  if ("type" in schema && schema.type === "string") {
    return false;
  }
  // Otherwise, return true if 'allOf' property exists in the schema
  return "allOf" in schema;
};

module.exports = hasAllOfSchemaButNotStringType;
