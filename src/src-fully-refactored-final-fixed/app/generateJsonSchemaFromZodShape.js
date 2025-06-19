/**
 * Generates a JSON Schema object from a Zod schema shape, with support for OpenAI compatibility and property requirements.
 *
 * @param {object} zodSchema - The Zod schema object to convert.
 * @param {object} options - Configuration options for schema generation.
 * @param {string} options.target - The target platform (e.g., 'openAi').
 * @param {Array<string>} options.currentPath - The current property path in the schema.
 * @returns {object} The generated JSON Schema object.
 */
function generateJsonSchemaFromZodShape(zodSchema, options) {
  const isOpenAiTarget = options.target === "openAi";
  const jsonSchema = {
    type: "object",
    properties: {}
  };
  const requiredProperties = [];
  const schemaShape = zodSchema.shape();

  for (const propertyName in schemaShape) {
    let propertySchema = schemaShape[propertyName];
    // Skip if property schema or its definition is undefined
    if (propertySchema === undefined || propertySchema._def === undefined) continue;

    let isOptional = Pq6(propertySchema);

    // For OpenAI target, ensure non-nullable and unwrap inner type if needed
    if (isOptional && isOpenAiTarget) {
      if (propertySchema instanceof ZF) {
        propertySchema = propertySchema._def.innerType;
      }
      if (!propertySchema.isNullable()) {
        propertySchema = propertySchema.nullable();
      }
      isOptional = false;
    }

    // Recursively generate JSON schema for the property
    const propertyJsonSchema = generateJsonSchemaFromZodType(propertySchema._def, {
      ...options,
      currentPath: [...options.currentPath, "properties", propertyName],
      propertyPath: [...options.currentPath, "properties", propertyName]
    });

    // Skip if property schema could not be generated
    if (propertyJsonSchema === undefined) continue;

    // Add property schema to properties
    jsonSchema.properties[propertyName] = propertyJsonSchema;

    // Track required properties
    if (!isOptional) {
      requiredProperties.push(propertyName);
    }
  }

  // Add required properties if any
  if (requiredProperties.length > 0) {
    jsonSchema.required = requiredProperties;
  }

  // Handle additionalProperties if defined
  const additionalPropertiesSchema = handleUnknownObjectKeys(zodSchema, options);
  if (additionalPropertiesSchema !== undefined) {
    jsonSchema.additionalProperties = additionalPropertiesSchema;
  }

  return jsonSchema;
}

module.exports = generateJsonSchemaFromZodShape;