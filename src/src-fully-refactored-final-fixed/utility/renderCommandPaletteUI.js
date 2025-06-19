/**
 * Renders the command palette UI based on the current application state.
 *
 * Depending on the presence of suggestions or help mode, this function renders different UI components.
 *
 * @param {Object} params - The parameters for rendering the command palette UI.
 * @param {('valid'|'invalid'|'missing')} params.apiKeyStatus - The current status of the API key.
 * @param {boolean} params.debug - Whether debug mode is enabled.
 * @param {string} params.exitMessage - The exit message to display.
 * @param {boolean} params.vimMode - Whether Vim mode is enabled.
 * @param {string} params.mode - The current editor mode.
 * @param {Object} params.autoUpdaterResult - The result of the auto-updater.
 * @param {boolean} params.isAutoUpdating - Whether an auto-update is in progress.
 * @param {boolean} params.verbose - Whether verbose output is enabled.
 * @param {Object} params.tokenUsage - Information about token usage.
 * @param {Function} params.onAutoUpdaterResult - Callback for auto-updater result.
 * @param {Function} params.onChangeIsUpdating - Callback for updating state changes.
 * @param {Array} params.suggestions - List of command suggestions to display.
 * @param {Object} params.selectedSuggestion - The currently selected suggestion.
 * @param {Object} params.notification - Notification object to display.
 * @param {Object} params.toolPermissionContext - Context for tool permissions.
 * @param {boolean} params.helpOpen - Whether the help panel is open.
 * @param {boolean} params.suppressHint - Whether to suppress hints.
 * @param {boolean} [params.shellsSelected=false] - Whether shells are selected.
 * @param {Object} params.ideSelection - The current IDE selection.
 * @param {Object} params.mcpClients - MCP clients information.
 * @param {Object} params.ideInstallationStatus - IDE installation status.
 * @param {boolean} [params.isPasting=false] - Whether the user is pasting content.
 * @returns {React.ReactElement} The rendered command palette UI.
 */
function renderCommandPaletteUI({
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
        suggestions,
        selectedSuggestion
      })
    );
  }

  // If help panel is open, render help instructions
  if (helpOpen) {
    return e9.createElement(
      g,
      {
        paddingX: 2,
        paddingY: 0,
        flexDirection: "row"
      },
      // Left column: command shortcuts
      e9.createElement(
        g,
        { flexDirection: "column", width: 22 },
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "! for bash mode")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "/ for commands")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "@ for file paths")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "# to memorize")
        )
      ),
      // Right column: keyboard shortcuts
      e9.createElement(
        g,
        { flexDirection: "column" },
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "double tap esc to undo")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "shift + tab to auto-accept edits")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, "ctrl + r for verbose output")
        ),
        e9.createElement(
          g,
          null,
          e9.createElement(_, { dimColor: true }, getNewlineShortcutHint())
        )
      )
    );
  }

  // Default: render the main command palette UI
  return e9.createElement(
    g,
    {
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

module.exports = renderCommandPaletteUI;