/**
 * Renders the status bar content based on the current UI state, suggestions, and help context.
 *
 * @param {Object} params - The parameters for rendering the status bar.
 * @param {string} params.apiKeyStatus - The current API key status.
 * @param {boolean} params.debug - Whether debug mode is enabled.
 * @param {string} params.exitMessage - The exit message to display.
 * @param {boolean} params.vimMode - Whether Vim mode is active.
 * @param {string} params.mode - The current editor mode.
 * @param {string} params.autoUpdaterResult - The result of the auto-updater.
 * @param {boolean} params.isAutoUpdating - Whether the auto-updater is running.
 * @param {boolean} params.verbose - Whether verbose output is enabled.
 * @param {number} params.tokenUsage - The current token usage count.
 * @param {Function} params.onAutoUpdaterResult - Callback for auto-updater result changes.
 * @param {Function} params.onChangeIsUpdating - Callback for updating status changes.
 * @param {Array} params.suggestions - List of suggestions to display.
 * @param {number} params.selectedSuggestion - Index of the currently selected suggestion.
 * @param {string} params.notification - Notification message to display.
 * @param {Object} params.toolPermissionContext - Context for tool permissions.
 * @param {boolean} params.helpOpen - Whether the help panel is open.
 * @param {boolean} params.suppressHint - Whether to suppress hints.
 * @param {boolean} [params.shellsSelected=false] - Whether shells are selected.
 * @param {string} params.ideSelection - The selected IDE.
 * @param {Array} params.mcpClients - List of MCP clients.
 * @param {string} params.ideInstallationStatus - Status of IDE installation.
 * @param {boolean} [params.isPasting=false] - Whether content is being pasted.
 * @returns {React.ReactElement} The rendered status bar content.
 */
function renderStatusBarContent({
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
  // If there are suggestions, render the suggestions component
  if (suggestions.length) {
    return e9.createElement(g, {
      paddingX: 2,
      paddingY: 0
    },
      e9.createElement(renderSuggestionList, {
        suggestions,
        selectedSuggestion
      })
    );
  }

  // If help is open, render the help panel with keyboard shortcuts
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

  // Default status bar rendering
  return e9.createElement(g, {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingX: 2,
    paddingY: 0
  },
    e9.createElement(renderStatusBarMessage, {
      exitMessage,
      vimMode,
      mode,
      notification,
      toolPermissionContext,
      suppressHint,
      shellsSelected,
      isPasting
    }),
    e9.createElement(StatusAndUpdaterPanel, {
      apiKeyStatus,
      autoUpdaterResult,
      debug,
      isAutoUpdating,
      verbose,
      tokenUsage,
      permissionMode: toolPermissionContext.mode,
      onAutoUpdaterResult,
      onChangeIsUpdating,
      ideSelection,
      mcpClients,
      ideInstallationStatus
    })
  );
}

module.exports = renderStatusBarContent;