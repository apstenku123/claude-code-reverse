/**
 * Builds a type definition object by merging the inner type definition with additional configuration,
 * and adds a default value from the source type.
 *
 * @param {object} sourceType - The source type object containing inner type and default value logic.
 * @param {object} config - Additional configuration to merge into the type definition.
 * @returns {object} The merged type definition object with a default value property.
 */
function buildTypeDefinitionWithDefault(sourceType, config) {
  // Merge the inner type definition with the provided config
  // and add a 'default' property from the source type'createInteractionAccessor default value
  return {
    ...generateJsonSchemaFromZodType(sourceType.innerType._def, config),
    default: sourceType.defaultValue()
  };
}

module.exports = buildTypeDefinitionWithDefault;