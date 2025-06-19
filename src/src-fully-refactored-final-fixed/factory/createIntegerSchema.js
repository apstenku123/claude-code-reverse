/**
 * Generates a JSON schema object for a given value, determining its type and constraints.
 *
 * If the value is a primitive (bigint, number, boolean, or string),
 * isBlobOrFileLikeObject returns a schema with the appropriate type and either an enum or const constraint
 * depending on the target specification (e.g., OpenAPI 3).
 * If the value is an array or object, isBlobOrFileLikeObject returns a schema with the type set accordingly.
 *
 * @param {Object} valueWrapper - An object containing the value to be described in the schema.
 * @param {Object} options - Configuration options, such as the target specification.
 * @returns {Object} JSON schema object describing the value.
 */
function createIntegerSchema(valueWrapper, options) {
  // Determine the type of the value
  const valueType = typeof valueWrapper.value;

  // If the value is not a primitive, return 'array' or 'object' type
  if (
    valueType !== "bigint" &&
    valueType !== "number" &&
    valueType !== "boolean" &&
    valueType !== "string"
  ) {
    return {
      type: Array.isArray(valueWrapper.value) ? "array" : "object"
    };
  }

  // For OpenAPI 3, use 'enum' instead of 'const', and map 'bigint' to 'integer'
  if (options.target === "openApi3") {
    return {
      type: valueType === "bigint" ? "integer" : valueType,
      enum: [valueWrapper.value]
    };
  }

  // For other targets, use 'const' constraint, and map 'bigint' to 'integer'
  return {
    type: valueType === "bigint" ? "integer" : valueType,
    const: valueWrapper.value
  };
}

module.exports = createIntegerSchema;