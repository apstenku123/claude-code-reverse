/**
 * Renders a message when a tool use is rejected, based on input validation and tool configuration.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {any} params.input - The input data to validate against the tool'createInteractionAccessor schema.
 * @param {Object} params.progressMessagesForMessage - Progress messages associated with the current message.
 * @param {Object} params.style - Style configuration for rendering.
 * @param {Object} params.tool - The tool object containing validation and rendering logic.
 * @param {Array} params.tools - List of all available tools.
 * @param {Object} params.messages - Messages context, possibly including terminal dimensions.
 * @param {boolean} params.verbose - Flag to enable verbose output.
 * @returns {React.Element|null} The rendered rejection message component, or null if validation fails or tool is missing.
 */
function renderToolUseRejectionMessage({
  input,
  progressMessagesForMessage,
  style,
  tool,
  tools,
  messages,
  verbose
}) {
  // Retrieve terminal or UI columns from context
  const { columns } = Z4();

  // If no tool is provided, render the fallback component
  if (!tool) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Validate the input against the tool'createInteractionAccessor input schema
  const validationResult = tool.inputSchema.safeParse(input);

  // If validation fails, render the fallback component
  if (!validationResult.success) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Render the tool use rejection message with the validated data and context
  return tool.renderToolUseRejectedMessage(validationResult.data, {
    columns,
    messages,
    tools,
    verbose,
    progressMessagesForMessage,
    style
  });
}

module.exports = renderToolUseRejectionMessage;