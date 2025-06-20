/**
 * Applies the 'input' effect strategy to a given schema definition if specified in the config.
 *
 * @param {Object} schemaWrapper - An object containing a schema with a _def property.
 * @param {Object} config - Configuration object that may specify an effectStrategy.
 * @returns {Object} The result of applying the input effect strategy, or an empty object if not applicable.
 */
function applyInputEffectStrategy(schemaWrapper, config) {
  // Check if the effect strategy specified in config is 'input'
  if (config.effectStrategy === "input") {
    // Call the external generateJsonSchemaFromZodType function with the schema definition and config
    return generateJsonSchemaFromZodType(schemaWrapper.schema._def, config);
  }
  // Return an empty object if the effect strategy is not 'input'
  return {};
}

module.exports = applyInputEffectStrategy;