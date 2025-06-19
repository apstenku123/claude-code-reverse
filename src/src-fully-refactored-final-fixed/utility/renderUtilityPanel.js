/**
 * Renders the utility panel UI based on the current application state.
 * Displays suggestions, help hints, or the main status/info bar depending on props.
 *
 * @param {Object} props - The properties for rendering the utility panel.
 * @param {string} props.apiKeyStatus - Current API key status.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {string} props.exitMessage - Message to display on exit.
 * @param {boolean} props.vimMode - Whether Vim mode is active.
 * @param {string} props.mode - Current editor/mode.
 * @param {string} props.autoUpdaterResult - Result of the auto-updater.
 * @param {boolean} props.isAutoUpdating - Whether auto-updating is in progress.
 * @param {boolean} props.verbose - Whether verbose mode is enabled.
 * @param {string} props.tokenUsage - Current token usage info.
 * @param {Function} props.onAutoUpdaterResult - Callback for auto-updater result.
 * @param {Function} props.onChangeIsUpdating - Callback for updating state changes.
 * @param {Array} props.suggestions - List of suggestion objects.
 * @param {number} props.selectedSuggestion - Index of the currently selected suggestion.
 * @param {string} props.notification - Current notification message.
 * @param {Object} props.toolPermissionContext - Context for tool permissions.
 * @param {boolean} props.helpOpen - Whether the help panel is open.
 * @param {boolean} props.suppressHint - Whether to suppress hints.
 * @param {boolean} [props.shellsSelected=false] - Whether shells are selected.
 * @param {string} props.ideSelection - Current IDE selection.
 * @param {Array} props.mcpClients - List of MCP client objects.
 * @param {string} props.ideInstallationStatus - IDE installation status.
 * @param {boolean} [props.isPasting=false] - Whether pasting is in progress.
 * @returns {React.ReactElement} The rendered utility panel component.
 */
function renderUtilityPanel({
  apiKeyStatus,
  debug,
  exitMessage,
  vimMode,
  mode,
  autoUpdaterResult,
  isAutoUpdating,
  verbose,
  tokenUsage,
  onAutoUpdaterResult,
  onChangeIsUpdating,
  suggestions,
  selectedSuggestion,
  notification,
  toolPermissionContext,
  helpOpen,
  suppressHint,
  shellsSelected = false,
  ideSelection,
  mcpClients,
  ideInstallationStatus,
  isPasting = false
}) {
  // If there are suggestions, render the suggestions panel
  if (suggestions.length) {
    return e9.createElement(g, {
      paddingX: 2,
      paddingY: 0
    },
      e9.createElement(renderSuggestionList, {
        suggestions: suggestions,
        selectedSuggestion: selectedSuggestion
      })
    );
  }

  // If help is open, render the help hints panel
  if (helpOpen) {
    return e9.createElement(g, {
      paddingX: 2,
      paddingY: 0,
      flexDirection: "row"
    },
      e9.createElement(g, {
        flexDirection: "column",
        width: 22
      },
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "! for bash mode")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "/ for commands")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "@ for file paths")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "# to memorize"))
      ),
      e9.createElement(g, {
        flexDirection: "column"
      },
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "double tap esc to undo")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "shift + tab to auto-accept edits")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, "ctrl + r for verbose output")),
        e9.createElement(g, null, e9.createElement(_, { dimColor: true }, getNewlineShortcutHint()))
      )
    );
  }

  // Default: render the main status/info bar
  return e9.createElement(g, {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingX: 2,
    paddingY: 0
  },
    e9.createElement(renderStatusBarMessage, {
      exitMessage: exitMessage,
      vimMode: vimMode,
      mode: mode,
      notification: notification,
      toolPermissionContext: toolPermissionContext,
      suppressHint: suppressHint,
      shellsSelected: shellsSelected,
      isPasting: isPasting
    }),
    e9.createElement(StatusAndUpdaterPanel, {
      apiKeyStatus: apiKeyStatus,
      autoUpdaterResult: autoUpdaterResult,
      debug: debug,
      isAutoUpdating: isAutoUpdating,
      verbose: verbose,
      tokenUsage: tokenUsage,
      permissionMode: toolPermissionContext.mode,
      onAutoUpdaterResult: onAutoUpdaterResult,
      onChangeIsUpdating: onChangeIsUpdating,
      ideSelection: ideSelection,
      mcpClients: mcpClients,
      ideInstallationStatus: ideInstallationStatus
    })
  );
}

module.exports = renderUtilityPanel;