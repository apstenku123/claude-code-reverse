/**
 * Merges the inner type definition of a source object with a configuration object, and adds a default value.
 *
 * @param {Object} sourceObject - An object that contains an 'innerType' property and a 'defaultValue' method.
 * @param {Object} config - a configuration object whose properties will be merged into the type definition.
 * @returns {Object} The merged type definition object with an added 'default' property.
 */
function mergeInnerTypeDefinitionWithDefault(sourceObject, config) {
  // Merge the inner type definition with the provided config
  // and add the default value from the source object
  return {
    ...generateJsonSchemaFromZodType(sourceObject.innerType._def, config),
    default: sourceObject.defaultValue()
  };
}

module.exports = mergeInnerTypeDefinitionWithDefault;