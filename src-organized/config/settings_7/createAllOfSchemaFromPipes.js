/**
 * Creates a combined 'allOf' schema definition by processing input and output pipe strategies.
 *
 * Depending on the 'pipeStrategy' property in the config, this function delegates to generateJsonSchemaFromZodType with either the input or output definition.
 * If no specific strategy is provided, isBlobOrFileLikeObject combines both input and output schemas using 'allOf', updating the currentPath accordingly.
 *
 * @param {Object} sourceObservable - The observable object containing 'in' and 'out' definitions.
 * @param {Object} config - Configuration object that may contain 'pipeStrategy' and 'currentPath'.
 * @returns {Object|undefined} The resulting schema definition, or undefined if no valid schemas are produced.
 */
function createAllOfSchemaFromPipes(sourceObservable, config) {
  // Handle explicit pipe strategies
  if (config.pipeStrategy === "input") {
    return generateJsonSchemaFromZodType(sourceObservable.in._def, config);
  } else if (config.pipeStrategy === "output") {
    return generateJsonSchemaFromZodType(sourceObservable.out._def, config);
  }

  // Process input schema
  const inputSchema = generateJsonSchemaFromZodType(sourceObservable.in._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", "0"]
  });

  // Process output schema, updating currentPath based on inputSchema existence
  const outputSchema = generateJsonSchemaFromZodType(sourceObservable.out._def, {
    ...config,
    currentPath: [
      ...config.currentPath,
      "allOf",
      inputSchema ? "1" : "0"
    ]
  });

  // Combine schemas, filtering out undefined results
  const allOfSchemas = [inputSchema, outputSchema].filter(schema => schema !== undefined);

  return {
    allOf: allOfSchemas
  };
}

module.exports = createAllOfSchemaFromPipes;