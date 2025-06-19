/**
 * Renders the success screen after Claude Code is installed, displaying installation details,
 * quick start instructions, and restart guidance if necessary.
 *
 * @param {Object} params - Parameters for rendering the install success screen.
 * @param {Function} params.onDone - Callback invoked when the user presses Escape or Return.
 * @param {string} [params.installedVersion] - The installed version of Claude Code, if available.
 * @returns {React.ReactElement} The React element representing the install success screen.
 */
function renderClaudeCodeInstallSuccessScreen({
  onDone,
  installedVersion
}) {
  // Get the current key press state (for exit instructions)
  const keyPressState = useCtrlKeyActionHandler();
  // Get the current theme colors/styles
  const theme = getThemeStylesheet();

  // Initialize any necessary state or side effects
  markIdeOnboardingAsShownForTerminal();

  // Listen for Escape or Return key to trigger onDone callback
  D0((_, keyEvent) => {
    if (keyEvent.escape || keyEvent.return) {
      onDone();
    }
  });

  // Determine the display name of the terminal/editor
  const editorDisplayName = pA.terminal ? getEditorDisplayName(pA.terminal) : "IDE";
  // Determine if this is a plugin or extension
  const installType = kZ ? "plugin" : "extension";
  // Platform-specific quit shortcut
  const quitShortcut = pA.platform === "macos" ? "Cmd+deepCloneWithCycleDetection" : "Ctrl+deepCloneWithCycleDetection";
  // Platform-specific insert file reference shortcut
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
      // Success message
      F7.default.createElement(
        _,
        {
          bold: true,
          color: theme.success
        },
        "\uD83C\uDF89 Claude Code ",
        installType,
        " installed in ",
        editorDisplayName,
        "!"
      ),
      // Show installed version if available
      installedVersion &&
        F7.default.createElement(
          _,
          { dimColor: true },
          "Version: ", installedVersion
        ),
      // Show restart warning if installed as plugin
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
      // Quick start instructions
      F7.default.createElement(_, null, "• Press Cmd+Esc to launch Claude Code"),
      F7.default.createElement(_, null, "• View and apply file diffs directly in your editor"),
      F7.default.createElement(
        _,
        null,
        "• Use ",
        insertFileShortcut,
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
    // Exit instructions or alternate component
    F7.default.createElement(
      g,
      { marginLeft: 3 },
      F7.default.createElement(
        _,
        { dimColor: true },
        keyPressState.pending
          ? F7.default.createElement(
              F7.default.Fragment,
              null,
              "Press ",
              keyPressState.keyName,
              " again to exit"
            )
          : F7.default.createElement(renderPressEnterPrompt, null)
      )
    )
  );
}

module.exports = renderClaudeCodeInstallSuccessScreen;