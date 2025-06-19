/**
 * Creates a combined schema definition using the 'allOf' keyword based on the provided pipe strategy.
 *
 * If the config specifies a 'pipeStrategy' of 'input' or 'output', delegates to generateJsonSchemaFromZodType with the corresponding schema definition.
 * Otherwise, constructs an 'allOf' array by processing both input and output schema definitions with updated paths.
 *
 * @param {Object} sourceObservable - The observable object containing 'in' and 'out' schema definitions.
 * @param {Object} config - The configuration object, which may include 'pipeStrategy' and 'currentPath'.
 * @returns {Object} An object with an 'allOf' property containing the processed schema definitions.
 */
function createAllOfPipeStrategy(sourceObservable, config) {
  // Handle direct input or output pipe strategies
  if (config.pipeStrategy === "input") {
    return generateJsonSchemaFromZodType(sourceObservable.in._def, config);
  } else if (config.pipeStrategy === "output") {
    return generateJsonSchemaFromZodType(sourceObservable.out._def, config);
  }

  // Process input schema definition
  const inputSchema = generateJsonSchemaFromZodType(sourceObservable.in._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", "0"]
  });

  // Process output schema definition
  // The index in the path depends on whether inputSchema is defined
  const outputSchema = generateJsonSchemaFromZodType(sourceObservable.out._def, {
    ...config,
    currentPath: [
      ...config.currentPath,
      "allOf",
      inputSchema ? "1" : "0"
    ]
  });

  // Return an object with an 'allOf' array, filtering out undefined schemas
  return {
    allOf: [inputSchema, outputSchema].filter(schema => schema !== undefined)
  };
}

module.exports = createAllOfPipeStrategy;