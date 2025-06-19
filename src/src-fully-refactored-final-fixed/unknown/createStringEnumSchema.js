/**
 * Generates a JSON schema object for a string enum based on the provided source.
 *
 * @param {Object} sourceEnum - An object containing a 'values' property, which is an iterable of allowed string values.
 * @returns {Object} JSON schema object representing a string enum with the provided values.
 */
function createStringEnumSchema(sourceEnum) {
  // Convert the iterable of values to an array for the enum property
  const enumValues = Array.from(sourceEnum.values);
  return {
    type: "string",
    enum: enumValues
  };
}

module.exports = createStringEnumSchema;