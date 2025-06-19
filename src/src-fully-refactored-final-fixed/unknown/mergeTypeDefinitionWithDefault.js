/**
 * Merges the inner type definition of a schema object with a configuration object,
 * and adds the schema'createInteractionAccessor default value under the 'default' key.
 *
 * @param {Object} schemaObject - The schema object containing an inner type and default value method.
 * @param {Object} config - The configuration object to merge with the type definition.
 * @returns {Object} The merged object containing all properties from the inner type definition,
 *                  the configuration object, and a 'default' property with the schema'createInteractionAccessor default value.
 */
function mergeTypeDefinitionWithDefault(schemaObject, config) {
  // Merge the inner type definition and config, then add the default value
  return {
    ...generateJsonSchemaFromZodType(schemaObject.innerType._def, config),
    default: schemaObject.defaultValue()
  };
}

module.exports = mergeTypeDefinitionWithDefault;