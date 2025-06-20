/**
 * Retrieves the configuration for the 'input' effect strategy if applicable.
 *
 * @param {Object} schemaWrapper - An object containing a 'schema' property with a '_def' definition.
 * @param {Object} effectConfig - Configuration object that must contain an 'effectStrategy' property and may contain other effect-related settings.
 * @returns {Object} The result of the 'generateJsonSchemaFromZodType' function if the effect strategy is 'input', otherwise an empty object.
 */
function getInputEffectStrategyConfig(schemaWrapper, effectConfig) {
  // Check if the effect strategy is 'input'
  if (effectConfig.effectStrategy === "input") {
    // Call the external 'generateJsonSchemaFromZodType' function with the schema definition and the config
    return generateJsonSchemaFromZodType(schemaWrapper.schema._def, effectConfig);
  }
  // If not 'input', return an empty object
  return {};
}

module.exports = getInputEffectStrategyConfig;