/**
 * Builds a metadata object for a tool, including its name, description, and input schema.
 *
 * @async
 * @function buildToolMetadata
 * @param {Object} toolDefinition - The tool definition object. Should have a 'name', 'prompt', and input schema properties.
 * @param {Object} toolContext - The context/configuration object. Should provide 'getToolPermissionContext' and 'tools'.
 * @returns {Promise<Object>} An object containing the tool'createInteractionAccessor name, description, and input schema.
 */
async function buildToolMetadata(toolDefinition, toolContext) {
  // Extract the tool'createInteractionAccessor name
  const toolName = toolDefinition.name;

  // Generate the tool'createInteractionAccessor description by calling the prompt function with the required context
  const toolDescription = await toolDefinition.prompt({
    getToolPermissionContext: toolContext.getToolPermissionContext,
    tools: toolContext.tools
  });

  // Determine the input schema: use inputJSONSchema if present, otherwise generate from inputSchema definition
  const inputSchema = (
    "inputJSONSchema" in toolDefinition && toolDefinition.inputJSONSchema
  )
    ? toolDefinition.inputJSONSchema
    : generateJsonSchemaFromDefinition(toolDefinition.inputSchema); // generateJsonSchemaFromDefinition: generateJsonSchemaFromDefinition

  return {
    name: toolName,
    description: toolDescription,
    input_schema: inputSchema
  };
}

module.exports = buildToolMetadata;