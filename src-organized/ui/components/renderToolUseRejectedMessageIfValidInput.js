/**
 * Renders a tool use rejection message if the provided input is valid for the tool'createInteractionAccessor input schema.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {any} params.input - The input data to validate against the tool'createInteractionAccessor input schema.
 * @param {any} params.progressMessagesForMessage - Progress messages related to the current message.
 * @param {any} params.style - Style configuration for rendering.
 * @param {Object} params.tool - The tool object containing the input schema and render method.
 * @param {Array} params.tools - List of all available tools.
 * @param {Object} params.messages - Messages context for rendering.
 * @param {boolean} params.verbose - Flag indicating whether to render in verbose mode.
 * @returns {React.Element|null} The rendered rejection message component, or null if input/tool is invalid.
 */
function renderToolUseRejectedMessageIfValidInput({
  input,
  progressMessagesForMessage,
  style,
  tool,
  tools,
  messages,
  verbose
}) {
  // Get the current terminal window size (columns)
  const { columns } = useTerminalWindowSize();

  // If no tool is provided, render a fallback component
  if (!tool) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Validate the input against the tool'createInteractionAccessor input schema
  const inputValidationResult = tool.inputSchema.safeParse(input);

  // If validation fails, render a fallback component
  if (!inputValidationResult.success) {
    return P11.createElement(renderNoActionFeedback, null);
  }

  // Render the tool use rejection message with the validated input and context
  return tool.renderToolUseRejectedMessage(inputValidationResult.data, {
    columns,
    messages,
    tools,
    verbose,
    progressMessagesForMessage,
    style
  });
}

module.exports = renderToolUseRejectedMessageIfValidInput;