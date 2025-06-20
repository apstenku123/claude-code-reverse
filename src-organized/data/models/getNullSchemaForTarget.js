/**
 * Returns a JSON schema object representing a null type, with special handling for OpenAPI 3 targets.
 *
 * If the target is 'openApi3', returns a schema with an enum containing only 'null' and sets nullable to true.
 * Otherwise, returns a schema with type 'null'.
 *
 * @param {Object} schemaOptions - Options describing the schema target.
 * @param {string} schemaOptions.target - The target specification (e.g., 'openApi3').
 * @returns {Object} JSON schema object for representing null values.
 */
function getNullSchemaForTarget(schemaOptions) {
  // Check if the target is OpenAPI 3, which requires a specific way to represent null
  if (schemaOptions.target === "openApi3") {
    return {
      enum: ["null"],
      nullable: true
    };
  }
  // Default JSON schema for null type
  return {
    type: "null"
  };
}

module.exports = getNullSchemaForTarget;
