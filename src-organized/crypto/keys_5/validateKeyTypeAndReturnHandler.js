/**
 * Validates the key type of a given field and returns a handler function with validation logic.
 *
 * Depending on the keyType specified in the fieldConfig, this function injects validation code
 * into the handlerBuilder to ensure that keys conform to the expected format (integer, long, or boolean).
 *
 * @param {function} handlerBuilder - Function that builds or chains handler logic for key validation.
 * @param {object} fieldConfig - Configuration object describing the field, must include a 'keyType' property.
 * @param {string} keyExpression - The string expression representing the key to validate (e.g., variable name in generated code).
 * @returns {function} The handlerBuilder function, potentially augmented with validation logic.
 */
function validateKeyTypeAndReturnHandler(handlerBuilder, fieldConfig, keyExpression) {
  switch (fieldConfig.keyType) {
    // Integer key types
    case "int32":
    case "uint32":
    case "sint32":
    case "fixed32":
    case "sfixed32":
      // Injects validation for 32-bit integer keys
      handlerBuilder("if(!util.key32Re.test(%createInteractionAccessor))", keyExpression)(
        "return%j",
        getExpectedTypeDescription(fieldConfig, "integer key")
      );
      break;
    // Long key types
    case "int64":
    case "uint64":
    case "sint64":
    case "fixed64":
    case "sfixed64":
      // Injects validation for 64-bit integer (Long) keys
      handlerBuilder("if(!util.key64Re.test(%createInteractionAccessor))", keyExpression)(
        "return%j",
        getExpectedTypeDescription(fieldConfig, "integer|Long key")
      );
      break;
    // Boolean key type
    case "bool":
      // Injects validation for boolean keys
      handlerBuilder("if(!util.key2Re.test(%createInteractionAccessor))", keyExpression)(
        "return%j",
        getExpectedTypeDescription(fieldConfig, "boolean key")
      );
      break;
    // No validation for other key types
  }
  return handlerBuilder;
}

module.exports = validateKeyTypeAndReturnHandler;