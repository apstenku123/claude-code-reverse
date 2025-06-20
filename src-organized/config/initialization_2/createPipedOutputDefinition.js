/**
 * Creates an output definition object based on the provided source observable and configuration.
 * Handles different pipe strategies ('input', 'output', or default) and constructs the appropriate output definition.
 *
 * @param {Object} sourceObservable - The observable object containing 'in' and 'out' definitions.
 * @param {Object} config - Configuration object that determines the pipe strategy and current path.
 * @returns {Object} An output definition object, possibly containing an 'allOf' array of definitions.
 */
function createPipedOutputDefinition(sourceObservable, config) {
  // Handle 'input' pipe strategy: use the input definition
  if (config.pipeStrategy === "input") {
    return generateJsonSchemaFromZodType(sourceObservable.in._def, config);
  }

  // Handle 'output' pipe strategy: use the output definition
  if (config.pipeStrategy === "output") {
    return generateJsonSchemaFromZodType(sourceObservable.out._def, config);
  }

  // Default strategy: combine input and output definitions using 'allOf'
  // First, process the input definition
  const inputDefinition = generateJsonSchemaFromZodType(sourceObservable.in._def, {
    ...config,
    currentPath: [...config.currentPath, "allOf", "0"]
  });

  // Next, process the output definition
  // If inputDefinition exists, use index '1', else use '0' for the path
  const outputDefinition = generateJsonSchemaFromZodType(sourceObservable.out._def, {
    ...config,
    currentPath: [
      ...config.currentPath,
      "allOf",
      inputDefinition ? "1" : "0"
    ]
  });

  // Return an object with 'allOf' containing the non-undefined definitions
  return {
    allOf: [inputDefinition, outputDefinition].filter(def => def !== undefined)
  };
}

module.exports = createPipedOutputDefinition;