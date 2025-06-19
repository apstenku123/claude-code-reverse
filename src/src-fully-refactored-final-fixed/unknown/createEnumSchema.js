/**
 * Creates a ZodEnum schema using the provided enum values and configuration options.
 *
 * @param {Array<string>} enumValues - An array of string values representing the enum members.
 * @param {Object} [options={}] - Optional configuration object for the schema.
 * @returns {RM} a new instance of RM representing the ZodEnum schema.
 */
function createEnumSchema(enumValues, options = {}) {
  // Merge the enum values, type name, and any additional options into the schema configuration
  return new RM({
    values: enumValues,
    typeName: R0.ZodEnum,
    ...createErrorMapConfig(options)
  });
}

module.exports = createEnumSchema;