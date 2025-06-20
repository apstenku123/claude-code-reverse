/**
 * Renders a tool permission component, handling keyboard shortcuts and user confirmation.
 *
 * @param {Object} params - Parameters for rendering the tool permission component.
 * @param {Object} params.toolUseConfirm - Object containing tool usage confirmation details and callbacks.
 * @param {Object} params.toolUseContext - Contextual information for the tool usage.
 * @param {Function} params.onDone - Callback invoked when the permission process is completed.
 * @param {Function} params.onReject - Callback invoked when the permission process is rejected.
 * @param {boolean} params.verbose - Flag indicating whether to enable verbose logging.
 * @param {Function} params.setToolPermissionContext - Function to set the tool permission context.
 * @returns {React.Element} The rendered tool permission React component.
 */
function renderToolPermissionComponent({
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext
}) {
  // Register a keyboard shortcut: Ctrl+C triggers onDone, onReject, and toolUseConfirm.onReject
  D0((key, event) => {
    if (event.ctrl && key === "c") {
      onDone();
      onReject();
      toolUseConfirm.onReject();
    }
  });

  // Get the user-facing name of the tool based on the current input
  const toolDisplayName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Display a message to the user requesting permission for tool usage
  useUserNotificationInterval(`Claude needs your permission to use ${toolDisplayName}`);

  // Get the React component for the tool permission UI
  const ToolPermissionComponent = getPermissionPromptComponent(toolUseConfirm.tool);

  // Render the tool permission component with all relevant props
  return w1A.createElement(ToolPermissionComponent, {
    toolUseContext,
    toolUseConfirm,
    onDone,
    onReject,
    verbose,
    setToolPermissionContext
  });
}

module.exports = renderToolPermissionComponent;
