/**
 * Creates a combined output definition based on the provided source observable and configuration.
 *
 * Depending on the pipeStrategy in the configuration, this function delegates to generateJsonSchemaFromZodType with either the input or output definition.
 * If no specific pipeStrategy is provided, isBlobOrFileLikeObject combines both input and output definitions into an 'allOf' schema.
 *
 * @param {Object} sourceObservable - The observable object containing 'in' and 'out' definitions.
 * @param {Object} config - Configuration object that may specify the pipeStrategy and currentPath.
 * @returns {Object} An object representing the combined output schema, or the result of generateJsonSchemaFromZodType if a pipeStrategy is specified.
 */
function createCombinedOutput(sourceObservable, config) {
  // Handle specific pipe strategies
  if (config.pipeStrategy === "input") {
    return generateJsonSchemaFromZodType(sourceObservable.in._def, config);
  } else if (config.pipeStrategy === "output") {
    return generateJsonSchemaFromZodType(sourceObservable.out._def, config);
  }

  // Default: combine input and output definitions into an 'allOf' schema
  // First, process the input definition
  const inputSchema = generateJsonSchemaFromZodType(sourceObservable.in._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", "0"]
  });

  // Then, process the output definition
  // The index in currentPath depends on whether inputSchema is defined
  const outputSchema = generateJsonSchemaFromZodType(sourceObservable.out._def, {
    ...config,
    currentPath: [
      ...config.currentPath,
      "allOf",
      inputSchema ? "1" : "0"
    ]
  });

  // Return an 'allOf' schema with only defined schemas
  return {
    allOf: [inputSchema, outputSchema].filter(schema => schema !== undefined)
  };
}

module.exports = createCombinedOutput;