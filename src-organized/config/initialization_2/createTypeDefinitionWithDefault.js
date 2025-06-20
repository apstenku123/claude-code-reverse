/**
 * Creates a type definition object by merging the inner type definition of a source schema
 * with a provided configuration, and adds the default value from the source schema.
 *
 * @param {object} sourceSchema - The schema object containing an innerType and defaultValue method.
 * @param {object} config - The configuration object to merge into the type definition.
 * @returns {object} The merged type definition object with a default value property.
 */
function createTypeDefinitionWithDefault(sourceSchema, config) {
  // Merge the inner type definition with the provided config
  // and add the default value from the source schema
  return {
    ...generateJsonSchemaFromZodType(sourceSchema.innerType._def, config),
    default: sourceSchema.defaultValue()
  };
}

module.exports = createTypeDefinitionWithDefault;