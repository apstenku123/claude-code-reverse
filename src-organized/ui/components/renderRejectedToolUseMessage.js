/**
 * Renders a message when a tool use is rejected, based on input validation and tool configuration.
 *
 * @param {Object} params - The parameters for rendering the rejected tool use message.
 * @param {any} params.input - The input data to validate against the tool'createInteractionAccessor schema.
 * @param {Object} params.progressMessagesForMessage - Progress messages associated with the current message.
 * @param {Object} params.style - Style configuration for rendering.
 * @param {Object} params.tool - The tool object containing schema and rendering logic.
 * @param {Array} params.tools - List of all available tools.
 * @param {Object} params.messages - Messages context, possibly including terminal dimensions.
 * @param {boolean} params.verbose - Flag to enable verbose output.
 * @returns {React.Element|null} The rendered rejected tool use message, or null if validation fails or tool is missing.
 */
function renderRejectedToolUseMessage({
  input,
  progressMessagesForMessage,
  style,
  tool,
  tools,
  messages,
  verbose
}) {
  // Retrieve terminal columns from external utility
  const { columns } = Z4();

  // If no tool is provided, render fallback component
  if (!tool) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Validate the input against the tool'createInteractionAccessor input schema
  const validationResult = tool.inputSchema.safeParse(input);

  // If validation fails, render fallback component
  if (!validationResult.success) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Render the rejected tool use message with all relevant context
  return tool.renderToolUseRejectedMessage(validationResult.data, {
    columns,
    messages,
    tools,
    verbose,
    progressMessagesForMessage,
    style
  });
}

module.exports = renderRejectedToolUseMessage;