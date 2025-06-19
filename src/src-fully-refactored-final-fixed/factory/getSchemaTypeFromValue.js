/**
 * Determines the JSON schema type and value constraints for a given value, supporting OpenAPI 3 compatibility.
 *
 * @param {Object} valueDescriptor - An object containing a 'value' property to be analyzed.
 * @param {Object} options - Configuration options, may include a 'target' property (e.g., 'openApi3').
 * @returns {Object} An object describing the schema type and constraints for the value.
 */
function getSchemaTypeFromValue(valueDescriptor, options) {
  const valueType = typeof valueDescriptor.value;

  // If the value is not a primitive, determine if isBlobOrFileLikeObject'createInteractionAccessor an array or object
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

  // For OpenAPI 3, use 'enum' for allowed values
  if (options.target === "openApi3") {
    return {
      type: valueType === "bigint" ? "integer" : valueType,
      enum: [valueDescriptor.value]
    };
  }

  // Otherwise, use 'const' for the exact value
  return {
    type: valueType === "bigint" ? "integer" : valueType,
    const: valueDescriptor.value
  };
}

module.exports = getSchemaTypeFromValue;