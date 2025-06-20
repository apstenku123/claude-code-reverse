/**
 * Displays a dialog prompting the user to allow or deny external CLAUDE.md file imports.
 * Handles user input, logs analytics events, and updates application state accordingly.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onDone - Callback function to execute after the user makes a choice.
 * @returns {React.ReactElement} The rendered dialog component.
 */
function showClaudeMdExternalIncludesDialog({ onDone }) {
  // Get current theme colors/styles
  const themeStyles = getThemeStylesheet();

  // Show analytics event when dialog is shown
  pZ.default.useEffect(() => {
    logTelemetryEventIfEnabled("claude_md_includes_dialog_shown", {});
  }, []);

  /**
   * Handles user'createInteractionAccessor decision to allow or deny external imports.
   * Logs analytics, updates state, and calls onDone callback.
   *
   * @param {string} userChoice - 'yes' to allow, 'no' to deny
   */
  function handleUserChoice(userChoice) {
    const currentSettings = getProjectSubscriptionConfig();
    if (userChoice === "no") {
      // User denied external imports
      logTelemetryEventIfEnabled("claude_md_external_includes_dialog_declined", {});
      updateProjectInConfig({
        ...currentSettings,
        hasClaudeMdExternalIncludesApproved: false,
        hasClaudeMdExternalIncludesWarningShown: true
      });
    } else {
      // User allowed external imports
      logTelemetryEventIfEnabled("claude_md_external_includes_dialog_accepted", {});
      updateProjectInConfig({
        ...currentSettings,
        hasClaudeMdExternalIncludesApproved: true,
        hasClaudeMdExternalIncludesWarningShown: true
      });
    }
    onDone();
  }

  // Get keyboard interaction state (e.g., for showing hints)
  const keyboardState = useCtrlKeyActionHandler();

  // Register handler for escape key to trigger denial
  D0((_, keyState) => {
    if (keyState.escape) {
      handleUserChoice("no");
      return;
    }
  });

  // Render the dialog UI
  return pZ.default.createElement(
    pZ.default.Fragment,
    null,
    pZ.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: themeStyles.warning
      },
      pZ.default.createElement(
        _,
        { bold: true, color: themeStyles.warning },
        "Allow external CLAUDE.md file imports?"
      ),
      pZ.default.createElement(
        _,
        null,
        "This project'createInteractionAccessor CLAUDE.md imports files outside the current working directory. Never allow this for third-party repositories."
      ),
      pZ.default.createElement(
        _,
        { dimColor: true },
        "Important: Only use ",
        m0,
        " with files you trust. Accessing untrusted files may pose security risks ",
        pZ.default.createElement(renderLinkOrText, {
          url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security"
        }),
        " "
      ),
      pZ.default.createElement(SelectableOptionsList, {
        options: [
          {
            label: "Yes, allow external imports",
            value: "yes"
          },
          {
            label: "No, disable external imports",
            value: "no"
          }
        ],
        onChange: userChoice => handleUserChoice(userChoice),
        onCancel: () => handleUserChoice("no")
      })
    ),
    pZ.default.createElement(
      g,
      { marginLeft: 3 },
      pZ.default.createElement(
        _,
        { dimColor: true },
        keyboardState.pending
          ? pZ.default.createElement(
              pZ.default.Fragment,
              null,
              "Press ",
              keyboardState.keyName,
              " again to exit"
            )
          : pZ.default.createElement(
              pZ.default.Fragment,
              null,
              "Enter to confirm · Esc to disable external includes"
            )
      )
    )
  );
}

module.exports = showClaudeMdExternalIncludesDialog;