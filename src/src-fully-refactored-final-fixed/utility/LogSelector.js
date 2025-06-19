/**
 * Renders a log selector UI component, filtering out sidechain logs and handling log selection.
 *
 * @param {Object} params - The parameters for the LogSelector.
 * @param {Object} params.context - The React context or component to render/unmount.
 * @param {Array} params.commands - The list of available commands for the app.
 * @param {Array} params.logs - The array of log objects to display.
 * @param {Array} params.initialTools - The initial set of tools for the app.
 * @param {Object} params.mcpClients - The MCP clients configuration.
 * @param {Object} params.dynamicMcpConfig - The dynamic MCP configuration.
 * @param {Object} params.appState - The initial application state.
 * @param {Function} params.onChangeAppState - Callback when the app state changes.
 * @param {boolean} params.debug - Flag to enable debug mode.
 * @returns {React.Element} The rendered LogSelector component.
 */
function LogSelector({
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
  // Filter out logs that are sidechain logs
  const filteredLogs = logs.filter(log => !log.isSidechain);

  // Initialize any required state or side effects
  useCtrlKeyActionHandler();

  /**
   * Handles the selection of a log entry.
   *
   * @param {number} logIndex - The index of the selected log in the logs array.
   * @returns {Promise<void>}
   */
  async function handleLogSelect(logIndex) {
    const selectedLog = logs[logIndex];
    if (!selectedLog) return;
    try {
      // Unmount the previous context/component if available
      context.unmount?.();
      // Perform any required cleanup for the selected log
      processFirstMessageSession(selectedLog);
      // Retrieve initial todos for the new session
      const initialTodos = processAgentConfigFile(g9());
      // Await any necessary asynchronous setup
      await clearConsoleScreen();
      // Render the main application UI with the selected log'createInteractionAccessor data
      C8(
        gz1.default.createElement(
          h3,
          {
            initialState: appState,
            onChangeAppState
          },
          gz1.default.createElement(createConversationFactory, {
            initialPrompt: "",
            debug,
            shouldShowPromptInput: true,
            commands,
            initialTools,
            initialMessages: NA1(selectedLog.messages, initialTools),
            initialTodos,
            mcpClients,
            dynamicMcpConfig
          })
        ),
        {
          exitOnCtrlC: false
        }
      );
    } catch (error) {
      // Handle and rethrow errors
      reportErrorIfAllowed(error);
      throw error;
    }
  }

  // Render the log selector UI component
  return gz1.default.createElement(LogListSelector, {
    logs: filteredLogs,
    onSelect: handleLogSelect
  });
}

module.exports = LogSelector;
