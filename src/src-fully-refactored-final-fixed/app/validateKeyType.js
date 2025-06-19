/**
 * Validates the key type of a given configuration and generates validation code for supported key types.
 *
 * Depending on the keyType specified in the config object, this function appends validation logic to the codeGenerator,
 * ensuring that only valid keys are accepted for the specified type. If the key is invalid, a return statement with an error message is generated.
 *
 * @param {Function} codeGenerator - Function that appends validation code and error handling logic.
 * @param {Object} keyConfig - Configuration object containing the keyType property.
 * @param {string} keyExpression - The string expression representing the key to be validated.
 * @returns {Function} The original codeGenerator function, potentially with appended validation logic.
 */
function validateKeyType(codeGenerator, keyConfig, keyExpression) {
  switch (keyConfig.keyType) {
    // Handle 32-bit integer key types
    case "int32":
    case "uint32":
    case "sint32":
    case "fixed32":
    case "sfixed32":
      // Validate using util.key32Re regular expression
      codeGenerator("if(!util.key32Re.test(%createInteractionAccessor))", keyExpression)
        ("return%j", getExpectedTypeDescription(keyConfig, "integer key"));
      break;
    // Handle 64-bit integer key types
    case "int64":
    case "uint64":
    case "sint64":
    case "fixed64":
    case "sfixed64":
      // Validate using util.key64Re regular expression
      codeGenerator("if(!util.key64Re.test(%createInteractionAccessor))", keyExpression)
        ("return%j", getExpectedTypeDescription(keyConfig, "integer|Long key"));
      break;
    // Handle boolean key type
    case "bool":
      // Validate using util.key2Re regular expression
      codeGenerator("if(!util.key2Re.test(%createInteractionAccessor))", keyExpression)
        ("return%j", getExpectedTypeDescription(keyConfig, "boolean key"));
      break;
    // No validation for other key types
  }
  return codeGenerator;
}

module.exports = validateKeyType;