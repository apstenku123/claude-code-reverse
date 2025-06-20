/**
 * Generates a meta message indicating that a specific tool was called with the given input.
 *
 * @param {string} toolName - The name of the tool that was called.
 * @param {object} toolInput - The input provided to the tool.
 * @returns {string} The formatted meta message string.
 */
function createToolMetaMessage(toolName, toolInput) {
  // Construct the content message with the tool name and its input serialized as JSON
  const content = `Called the ${toolName} tool with the following input: ${JSON.stringify(toolInput)}`;

  // Pass the content and meta flag to the external createUserMessageObject function
  return createUserMessageObject({
    content,
    isMeta: true
  });
}

module.exports = createToolMetaMessage;