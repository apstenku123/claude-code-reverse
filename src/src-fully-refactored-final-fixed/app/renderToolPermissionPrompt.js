/**
 * Renders a permission prompt for a tool, handling user confirmation and rejection events.
 *
 * This function sets up a keyboard event listener to handle Ctrl+C as a rejection,
 * displays a message requesting permission for the tool, and renders the tool'createInteractionAccessor permission UI component.
 *
 * @param {Object} params - The parameters for rendering the tool permission prompt.
 * @param {Object} params.toolUseConfirm - Object containing tool info, input, and callbacks for confirmation/rejection.
 * @param {Object} params.toolUseContext - Contextual information required by the tool'createInteractionAccessor permission component.
 * @param {Function} params.onDone - Callback to invoke when the permission process completes successfully.
 * @param {Function} params.onReject - Callback to invoke when the permission process is rejected.
 * @param {boolean} params.verbose - Flag indicating whether to enable verbose logging or UI.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @returns {React.ReactElement} The rendered tool permission React component.
 */
function renderToolPermissionPrompt({
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext
}) {
  // Set up a keyboard event listener for Ctrl+C to trigger rejection callbacks
  D0((pressedKey, event) => {
    if (event.ctrl && pressedKey === "c") {
      onDone();
      onReject();
      toolUseConfirm.onReject();
    }
  });

  // Get the user-facing name of the tool based on the current input
  const toolDisplayName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Display a message to the user requesting permission for the tool
  useUserNotificationInterval(`Claude needs your permission to use ${toolDisplayName}`);

  // Retrieve the React component for the tool'createInteractionAccessor permission UI
  const ToolPermissionComponent = getPermissionPromptComponent(toolUseConfirm.tool);

  // Render the tool'createInteractionAccessor permission UI component with all required props
  return w1A.createElement(ToolPermissionComponent, {
    toolUseContext,
    toolUseConfirm,
    onDone,
    onReject,
    verbose,
    setToolPermissionContext
  });
}

module.exports = renderToolPermissionPrompt;