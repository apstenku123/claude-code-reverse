/**
 * Determines the effect strategy for the given configuration and returns the result accordingly.
 *
 * If the effect strategy specified in the config is 'input', isBlobOrFileLikeObject calls the external 'generateJsonSchemaFromZodType' function
 * with the schema definition and the config object. Otherwise, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {Object} schemaWrapper - An object containing a 'schema' property with a '_def' definition.
 * @param {Object} config - Configuration object that must contain an 'effectStrategy' property.
 * @returns {Object} The result of the 'generateJsonSchemaFromZodType' function if the effect strategy is 'input', otherwise an empty object.
 */
function getInputEffectStrategyResult(schemaWrapper, config) {
  // Check if the effect strategy is 'input'
  if (config.effectStrategy === "input") {
    // Call the external 'generateJsonSchemaFromZodType' function with the schema definition and config
    return generateJsonSchemaFromZodType(schemaWrapper.schema._def, config);
  }
  // If the effect strategy is not 'input', return an empty object
  return {};
}

module.exports = getInputEffectStrategyResult;