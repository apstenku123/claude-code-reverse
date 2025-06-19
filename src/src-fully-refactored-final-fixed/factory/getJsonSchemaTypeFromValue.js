/**
 * Determines the JSON Schema type and related constraints for a given value.
 *
 * @param {Object} valueWrapper - An object containing the value to analyze (expects a 'value' property).
 * @param {Object} options - Configuration options (expects a 'target' property).
 * @returns {Object} JSON Schema type definition with appropriate constraints.
 */
function getJsonSchemaTypeFromValue(valueWrapper, options) {
  const valueType = typeof valueWrapper.value;

  // Handle non-primitive types (objects and arrays)
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

  // For OpenAPI 3, use 'enum' with a single value
  if (options.target === "openApi3") {
    return {
      type: valueType === "bigint" ? "integer" : valueType,
      enum: [valueWrapper.value]
    };
  }

  // For other targets, use 'const' to specify the exact value
  return {
    type: valueType === "bigint" ? "integer" : valueType,
    const: valueWrapper.value
  };
}

module.exports = getJsonSchemaTypeFromValue;