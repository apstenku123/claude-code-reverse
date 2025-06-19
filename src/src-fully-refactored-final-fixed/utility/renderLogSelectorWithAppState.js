/**
 * Renders a log selector UI component and handles selection of log entries to mount an application state.
 *
 * @param {Object} params - The parameters for rendering and handling log selection.
 * @param {Object} params.context - The React context or component to be mounted/unmounted.
 * @param {Array} params.commands - The list of available commands for the app.
 * @param {Array} params.logs - The array of log entries to display and select from.
 * @param {Array} params.initialTools - The initial set of tools available to the app.
 * @param {Object} params.mcpClients - The MCP client instances for backend communication.
 * @param {Object} params.dynamicMcpConfig - The dynamic configuration for MCP.
 * @param {Object} params.appState - The initial application state to be passed to the app.
 * @param {Function} params.onChangeAppState - Callback to handle changes in the application state.
 * @param {boolean} params.debug - Flag to enable or disable debug mode.
 * @returns {React.Element} The rendered log selector React element.
 */
function renderLogSelectorWithAppState({
  context,
  commands,
  logs,
  initialTools,
  mcpClients,
  dynamicMcpConfig,
  appState,
  onChangeAppState,
  debug
}) {
  // Filter out sidechain logs to only show main logs in the selector
  const mainLogs = logs.filter(logEntry => !logEntry.isSidechain);

  // Perform any required initialization for the selector UI
  useCtrlKeyActionHandler();

  /**
   * Handles selection of a log entry, mounts the app with the selected log'createInteractionAccessor messages and state.
   * @param {number} selectedLogIndex - The index of the selected log entry in the logs array.
   */
  async function handleLogSelection(selectedLogIndex) {
    const selectedLog = logs[selectedLogIndex];
    if (!selectedLog) return;
    try {
      // Unmount any existing context/component if available, then reset rendering state
      context.unmount?.();
      processFirstMessageSession(selectedLog);

      // Prepare initial todos from current state
      const initialTodos = processAgentConfigFile(g9());

      // Wait for any required async preparation
      await clearConsoleScreen();

      // Render the main application UI with the selected log'createInteractionAccessor messages and provided state/tools
      C8(gz1.default.createElement(h3, {
        initialState: appState,
        onChangeAppState: onChangeAppState
      }, gz1.default.createElement(createConversationFactory, {
        initialPrompt: "",
        debug: debug,
        shouldShowPromptInput: true,
        commands: commands,
        initialTools: initialTools,
        initialMessages: NA1(selectedLog.messages, initialTools),
        initialTodos: initialTodos,
        mcpClients: mcpClients,
        dynamicMcpConfig: dynamicMcpConfig
      })), {
        exitOnCtrlC: false
      });
    } catch (error) {
      // Log and rethrow the error for upstream handling
      reportErrorIfAllowed(error);
      throw error;
    }
  }

  // Render the log selector UI with the filtered logs and selection handler
  return gz1.default.createElement(LogListSelector, {
    logs: mainLogs,
    onSelect: handleLogSelection
  });
}

module.exports = renderLogSelectorWithAppState;