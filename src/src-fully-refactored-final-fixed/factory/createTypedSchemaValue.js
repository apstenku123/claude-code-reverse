/**
 * Generates a schema object describing the type and value constraints of the provided input.
 *
 * @param {Object} valueDescriptor - An object containing a 'value' property to analyze.
 * @param {Object} options - Configuration options, may contain a 'target' property.
 * @returns {Object} Schema object with type and value constraints ('type', 'enum', or 'const').
 */
function createTypedSchemaValue(valueDescriptor, options) {
  // Determine the JavaScript type of the value
  const valueType = typeof valueDescriptor.value;

  // If the value is not a primitive type, determine if isBlobOrFileLikeObject'createInteractionAccessor an array or object
  if (
    valueType !== "bigint" &&
    valueType !== "number" &&
    valueType !== "boolean" &&
    valueType !== "string"
  ) {
    return {
      type: Array.isArray(valueDescriptor.value) ? "array" : "object"
    };
  }

  // For OpenAPI 3, use 'enum' to specify allowed values
  if (options.target === "openApi3") {
    return {
      type: valueType === "bigint" ? "integer" : valueType,
      enum: [valueDescriptor.value]
    };
  }

  // For other targets, use 'const' to specify a fixed value
  return {
    type: valueType === "bigint" ? "integer" : valueType,
    const: valueDescriptor.value
  };
}

module.exports = createTypedSchemaValue;