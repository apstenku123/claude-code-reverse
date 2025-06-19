/**
 * Displays a dialog prompting the user to approve or decline external CLAUDE.md file imports.
 * Handles user interaction, logs analytics events, and updates approval state accordingly.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onDone - Callback to invoke after the user makes a choice.
 * @returns {React.ReactElement} The rendered approval dialog component.
 */
function ExternalIncludesApprovalDialog({ onDone }) {
  // Get the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();

  // Log that the dialog was shown (analytics)
  pZ.default.useEffect(() => {
    logTelemetryEventIfEnabled("claude_md_includes_dialog_shown", {});
  }, []);

  /**
   * Handles the user'createInteractionAccessor approval or decline action.
   * Updates state, logs analytics, and invokes the onDone callback.
   *
   * @param {"yes"|"no"} userChoice - The user'createInteractionAccessor choice.
   */
  function handleUserChoice(userChoice) {
    const currentSettings = getProjectSubscriptionConfig();
    if (userChoice === "no") {
      // User declined external includes
      logTelemetryEventIfEnabled("claude_md_external_includes_dialog_declined", {});
      updateProjectInConfig({
        ...currentSettings,
        hasClaudeMdExternalIncludesApproved: false,
        hasClaudeMdExternalIncludesWarningShown: true
      });
    } else {
      // User accepted external includes
      logTelemetryEventIfEnabled("claude_md_external_includes_dialog_accepted", {});
      updateProjectInConfig({
        ...currentSettings,
        hasClaudeMdExternalIncludesApproved: true,
        hasClaudeMdExternalIncludesWarningShown: true
      });
    }
    // Notify parent that the dialog is done
    onDone();
  }

  // Get keyboard shortcut info (e.g., for exit)
  const keyboardShortcuts = useCtrlKeyActionHandler();

  // Register a global handler for the escape key to decline
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
        borderColor: theme.warning
      },
      pZ.default.createElement(
        _,
        { bold: true, color: theme.warning },
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
        keyboardShortcuts.pending
          ? pZ.default.createElement(
              pZ.default.Fragment,
              null,
              "Press ",
              keyboardShortcuts.keyName,
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

module.exports = ExternalIncludesApprovalDialog;