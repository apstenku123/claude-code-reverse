/**
 * Generates a meta content object indicating a tool was called with specific input.
 *
 * @param {string} toolName - The name of the tool that was called.
 * @param {object} toolInput - The input provided to the tool.
 * @returns {object} a meta content object describing the tool call.
 */
function createMetaContentForToolCall(toolName, toolInput) {
  // Construct the content message with the tool name and its input serialized as JSON
  const contentMessage = `Called the ${toolName} tool with the following input: ${JSON.stringify(toolInput)}`;

  // Return the meta content object using the external createUserMessageObject function
  return createUserMessageObject({
    content: contentMessage,
    isMeta: true
  });
}

module.exports = createMetaContentForToolCall;