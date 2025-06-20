/**
 * Renders a success message UI after Claude Code is installed, including version info, restart instructions, and quick start tips.
 * Handles keyboard shortcuts for exiting the message and adapts content based on platform and installation type.
 *
 * @param {Object} params - Parameters for rendering the success message.
 * @param {Function} params.onDone - Callback to invoke when the user presses escape or return.
 * @param {string} [params.installedVersion] - The installed version of Claude Code, if available.
 * @returns {React.ReactElement} The rendered success message UI.
 */
function renderClaudeCodeInstallSuccessMessage({
  onDone,
  installedVersion
}) {
  // Get keyboard shortcut state (e.g., for exit key handling)
  const keyboardShortcutState = useCtrlKeyActionHandler();
  // Get current theme colors/styles
  const theme = getThemeStylesheet();

  // Set up keyboard event handler for escape/return to trigger onDone
  markIdeOnboardingAsShownForTerminal();
  D0((_, keyEvent) => {
    if (keyEvent.escape || keyEvent.return) {
      onDone();
    }
  });

  // Determine display name for the current terminal/editor
  const editorDisplayName = pA.terminal ? getEditorDisplayName(pA.terminal) : "IDE";
  // Determine installation type label
  const installTypeLabel = kZ ? "plugin" : "extension";
  // Platform-specific quit shortcut
  const quitShortcut = pA.platform === "macos" ? "Cmd+deepCloneWithCycleDetection" : "Ctrl+deepCloneWithCycleDetection";
  // Platform-specific insert-file shortcut
  const insertFileShortcut = pA.platform === "macos" ? "Cmd+Option+sendHttpRequestOverSocket" : "Ctrl+Alt+sendHttpRequestOverSocket";

  return F7.default.createElement(
    F7.default.Fragment,
    null,
    F7.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        padding: 1,
        marginTop: 2,
        borderColor: theme.secondaryBorder
      },
      // Success headline
      F7.default.createElement(
        _,
        { bold: true, color: theme.success },
        "\uD83C\uDF89 Claude Code ", installTypeLabel, " installed in ", editorDisplayName, "!"
      ),
      // Show version if available
      installedVersion && F7.default.createElement(
        _,
        { dimColor: true },
        "Version: ", installedVersion
      ),
      // Show restart warning if plugin
      kZ && F7.default.createElement(
        g,
        { marginTop: 1 },
        F7.default.createElement(
          _,
          { color: theme.warning },
          y0.warning,
          " Restart ", editorDisplayName, " (", quitShortcut, ") to continue (may require multiple restarts)"
        )
      ),
      // Quick start section
      F7.default.createElement(
        g,
        { marginTop: 1 },
        F7.default.createElement(
          _,
          { bold: true },
          "Quick start:"
        )
      ),
      F7.default.createElement(_, null, "• Press Cmd+Esc to launch Claude Code"),
      F7.default.createElement(_, null, "• View and apply file diffs directly in your editor"),
      F7.default.createElement(
        _,
        null,
        "• Use ", insertFileShortcut, " to insert @File references"
      ),
      // Documentation link
      F7.default.createElement(
        g,
        { marginTop: 1 },
        F7.default.createElement(
          _,
          null,
          "For more information, see https://docs.anthropic.com/createInteractionAccessor/claude-code-ide-integrations"
        )
      )
    ),
    // Exit instructions or spinner
    F7.default.createElement(
      g,
      { marginLeft: 3 },
      F7.default.createElement(
        _,
        { dimColor: true },
        keyboardShortcutState.pending
          ? F7.default.createElement(
              F7.default.Fragment,
              null,
              "Press ", keyboardShortcutState.keyName, " again to exit"
            )
          : F7.default.createElement(renderPressEnterPrompt, null)
      )
    )
  );
}

module.exports = renderClaudeCodeInstallSuccessMessage;