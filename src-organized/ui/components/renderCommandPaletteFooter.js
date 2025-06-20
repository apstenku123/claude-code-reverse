/**
 * Renders the footer section of the command palette, displaying suggestions, help hints, or status information.
 *
 * @param {Object} props - The properties for rendering the footer.
 * @param {string} props.apiKeyStatus - The current status of the API key.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {string} props.exitMessage - The message to display when exiting.
 * @param {boolean} props.vimMode - Whether Vim mode is active.
 * @param {string} props.mode - The current mode of the application.
 * @param {string} props.autoUpdaterResult - The result of the auto-updater.
 * @param {boolean} props.isAutoUpdating - Whether the auto-updater is running.
 * @param {boolean} props.verbose - Whether verbose output is enabled.
 * @param {string} props.tokenUsage - The current token usage information.
 * @param {function} props.onAutoUpdaterResult - Callback for auto-updater result changes.
 * @param {function} props.onChangeIsUpdating - Callback for updating status changes.
 * @param {Array} props.suggestions - List of suggestion objects to display.
 * @param {Object} props.selectedSuggestion - The currently selected suggestion.
 * @param {string} props.notification - Notification message to display.
 * @param {Object} props.toolPermissionContext - Context for tool permissions.
 * @param {boolean} props.helpOpen - Whether the help panel is open.
 * @param {boolean} props.suppressHint - Whether to suppress hint messages.
 * @param {boolean} [props.shellsSelected=false] - Whether shells are selected.
 * @param {string} props.ideSelection - The current IDE selection.
 * @param {Array} props.mcpClients - List of MCP clients.
 * @param {string} props.ideInstallationStatus - The IDE installation status.
 * @param {boolean} [props.isPasting=false] - Whether content is being pasted.
 * @returns {React.Element} The rendered footer component for the command palette.
 */
function renderCommandPaletteFooter({
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
  // If there are suggestions, render the suggestions list
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

  // If help is open, render the help/hint panel
  if (helpOpen) {
    return e9.createElement(
      g,
      {
        paddingX: 2,
        paddingY: 0,
        flexDirection: "row"
      },
      // Left column: symbol hints
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

  // Default: render status and controls
  return e9.createElement(
    g,
    {
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

module.exports = renderCommandPaletteFooter;