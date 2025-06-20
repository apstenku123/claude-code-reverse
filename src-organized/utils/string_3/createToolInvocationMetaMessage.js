/**
 * Generates a meta message indicating that a specific tool was called with the provided input.
 *
 * @param {string} toolName - The name of the tool that was invoked.
 * @param {object} toolInput - The input object passed to the tool.
 * @returns {string} a meta message describing the tool invocation, formatted for further processing.
 */
function createToolInvocationMetaMessage(toolName, toolInput) {
  // Construct a message describing the tool invocation and its input
  const messageContent = `Called the ${toolName} tool with the following input: ${JSON.stringify(toolInput)}`;

  // Pass the message and meta flag to the external handler createUserMessageObject
  return createUserMessageObject({
    content: messageContent,
    isMeta: true
  });
}

module.exports = createToolInvocationMetaMessage;