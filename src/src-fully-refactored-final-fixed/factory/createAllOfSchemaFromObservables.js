/**
 * Creates a combined schema using 'allOf' from the input and output definitions of an observable,
 * based on the provided configuration and pipe strategy.
 *
 * If the pipe strategy is 'input', only the input schema is returned.
 * If the pipe strategy is 'output', only the output schema is returned.
 * Otherwise, both input and output schemas are combined using 'allOf'.
 *
 * @param {Object} sourceObservable - The observable object containing 'in' and 'out' definitions.
 * @param {Object} config - Configuration object that may include pipeStrategy and currentPath.
 * @returns {Object|undefined} - The resulting schema object, or undefined if neither input nor output schemas are present.
 */
function createAllOfSchemaFromObservables(sourceObservable, config) {
  // Handle pipeStrategy: return only the input schema if specified
  if (config.pipeStrategy === "input") {
    return generateJsonSchemaFromZodType(sourceObservable.in._def, config);
  }
  // Handle pipeStrategy: return only the output schema if specified
  if (config.pipeStrategy === "output") {
    return generateJsonSchemaFromZodType(sourceObservable.out._def, config);
  }

  // Build the input schema, extending the currentPath for traceability
  const inputSchema = generateJsonSchemaFromZodType(sourceObservable.in._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", "0"]
  });

  // Build the output schema, extending the currentPath and using the result of inputSchema
  const outputSchema = generateJsonSchemaFromZodType(sourceObservable.out._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", inputSchema ? "1" : "0"]
  });

  // Combine schemas using 'allOf', filtering out any undefined schemas
  return {
    allOf: [inputSchema, outputSchema].filter(schema => schema !== undefined)
  };
}

module.exports = createAllOfSchemaFromObservables;