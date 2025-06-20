/**
 * Renders the success message UI after Claude Code is installed, including version info, restart instructions, and quick start tips.
 * Handles keyboard shortcuts for exiting the screen and triggers the onDone callback when escape or return is pressed.
 *
 * @param {Object} params - Parameters for rendering the install success screen.
 * @param {Function} params.onDone - Callback to invoke when the user wants to exit the screen.
 * @param {string} [params.installedVersion] - The installed version of Claude Code, if available.
 * @returns {React.ReactElement} The rendered success message UI.
 */
function renderClaudeCodeInstallSuccess({ onDone, installedVersion }) {
  // Get the pending exit state and key name for exit shortcut
  const exitState = useCtrlKeyActionHandler();
  // Get the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();
  // Set up any required terminal state (side effect)
  markIdeOnboardingAsShownForTerminal();

  // Listen for escape or return key to trigger onDone callback
  D0((_, keyEvent) => {
    if (keyEvent.escape || keyEvent.return) {
      onDone();
    }
  });

  // Determine the display name of the editor or fallback to 'IDE'
  const editorDisplayName = pA.terminal ? getEditorDisplayName(pA.terminal) : "IDE";
  // Determine if this is a plugin or extension install
  const installType = kZ ? "plugin" : "extension";
  // Platform-specific quit shortcut
  const quitShortcut = pA.platform === "macos" ? "Cmd+deepCloneWithCycleDetection" : "Ctrl+deepCloneWithCycleDetection";
  // Platform-specific file reference shortcut
  const fileReferenceShortcut = pA.platform === "macos" ? "Cmd+Option+sendHttpRequestOverSocket" : "Ctrl+Alt+sendHttpRequestOverSocket";

  return F7.default.createElement(
    F7.default.Fragment,
    null,
    // Main container
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
        "\uD83C\uDF89 Claude Code ",
        installType,
        " installed in ",
        editorDisplayName,
        "!"
      ),
      // Version info, if available
      installedVersion &&
        F7.default.createElement(
          _,
          { dimColor: true },
          "Version: ",
          installedVersion
        ),
      // Plugin-specific restart warning
      kZ &&
        F7.default.createElement(
          g,
          { marginTop: 1 },
          F7.default.createElement(
            _,
            { color: theme.warning },
            y0.warning,
            " Restart ",
            editorDisplayName,
            " (",
            quitShortcut,
            ") to continue (may require multiple restarts)"
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
      // Quick start tips
      F7.default.createElement(
        _,
        null,
        "• Press Cmd+Esc to launch Claude Code"
      ),
      F7.default.createElement(
        _,
        null,
        "• View and apply file diffs directly in your editor"
      ),
      F7.default.createElement(
        _,
        null,
        "• Use ",
        fileReferenceShortcut,
        " to insert @File references"
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
    // Exit prompt (bottom right)
    F7.default.createElement(
      g,
      { marginLeft: 3 },
      F7.default.createElement(
        _,
        { dimColor: true },
        exitState.pending
          ? F7.default.createElement(
              F7.default.Fragment,
              null,
              "Press ",
              exitState.keyName,
              " again to exit"
            )
          : F7.default.createElement(renderPressEnterPrompt, null)
      )
    )
  );
}

module.exports = renderClaudeCodeInstallSuccess;
