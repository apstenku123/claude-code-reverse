/**
 * Generates a JSON Schema object from a Zod object schema, handling OpenAI-specific requirements.
 *
 * @param {ZodObject} zodSchema - The Zod object schema to convert.
 * @param {Object} options - Configuration options for schema generation.
 * @param {string} options.target - The target platform (e.g., 'openAi').
 * @param {Array<string>} options.currentPath - The current property path in the schema.
 * @returns {Object} The generated JSON Schema object.
 */
function generateJsonSchemaFromZodObject(zodSchema, options) {
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

    let isOpenAiFunction = Pq6(propertySchema);

    // For OpenAI target, adjust property schema if needed
    if (isOpenAiFunction && isOpenAiTarget) {
      // If propertySchema is an instance of ZF, use its inner type
      if (propertySchema instanceof ZF) {
        propertySchema = propertySchema._def.innerType;
      }
      // Ensure the property is nullable
      if (!propertySchema.isNullable()) {
        propertySchema = propertySchema.nullable();
      }
      isOpenAiFunction = false;
    }

    // Recursively generate the JSON schema for this property
    const propertyJsonSchema = generateJsonSchemaFromZodType(propertySchema._def, {
      ...options,
      currentPath: [...options.currentPath, "properties", propertyName],
      propertyPath: [...options.currentPath, "properties", propertyName]
    });

    // Skip if property schema could not be generated
    if (propertyJsonSchema === undefined) continue;

    // Add the property schema to the properties object
    jsonSchema.properties[propertyName] = propertyJsonSchema;

    // If this property is required (not an OpenAI function), add to required list
    if (!isOpenAiFunction) {
      requiredProperties.push(propertyName);
    }
  }

  // If there are required properties, add them to the schema
  if (requiredProperties.length > 0) {
    jsonSchema.required = requiredProperties;
  }

  // Handle additionalProperties if defined by handleUnknownObjectKeys
  const additionalPropertiesSchema = handleUnknownObjectKeys(zodSchema, options);
  if (additionalPropertiesSchema !== undefined) {
    jsonSchema.additionalProperties = additionalPropertiesSchema;
  }

  return jsonSchema;
}

module.exports = generateJsonSchemaFromZodObject;