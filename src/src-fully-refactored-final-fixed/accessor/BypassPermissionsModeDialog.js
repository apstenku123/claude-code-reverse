/**
 * Displays a warning dialog when entering Bypass Permissions mode, handles user acceptance or decline, and manages related side effects.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onAccept - Callback invoked when the user accepts Bypass Permissions mode.
 * @returns {React.ReactElement} The rendered dialog component.
 */
function BypassPermissionsModeDialog({ onAccept }) {
  // Get theme colors/styles
  const themeStyles = getThemeStylesheet();

  // Show analytics event when dialog is shown
  React.useEffect(() => {
    logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_shown", {});
  }, []);

  /**
   * Handles user selection in the dialog (accept or decline).
   * @param {string} action - The action selected by the user ('accept' or 'decline').
   */
  function handleDialogAction(action) {
    const config = getCachedOrFreshConfig();
    switch (action) {
      case "accept": {
        // Log analytics, update config, and invoke accept callback
        logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_accept", {});
        updateProjectsAccessor({
          ...config,
          bypassPermissionsModeAccepted: true
        });
        onAccept();
        break;
      }
      case "decline": {
        // Close the dialog with decline code
        Q7(1);
        break;
      }
      default:
        break;
    }
  }

  // Get keyboard shortcut info for UI hints
  const keyboardShortcuts = useCtrlKeyActionHandler();

  // Listen for escape key to close dialog
  D0((_, keyState) => {
    if (keyState.escape) {
      Q7(0);
      return;
    }
  });

  // Render the dialog UI
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: themeStyles.error
      },
      React.createElement(
        _,
        { bold: true, color: themeStyles.error },
        "WARNING: ",
        m0,
        " running in Bypass Permissions mode"
      ),
      React.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        React.createElement(
          _,
          null,
          "In Bypass Permissions mode, ",
          m0,
          " will not ask for your approval before running potentially dangerous commands.",
          React.createElement(RG, null),
          "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."
        ),
        React.createElement(
          _,
          null,
          "resolvePropertyPath proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."
        ),
        React.createElement(renderLinkOrText, {
          url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security"
        })
      ),
      React.createElement(SelectableOptionsList, {
        options: [
          { label: "No, exit", value: "decline" },
          { label: "Yes, createObjectTracker accept", value: "accept" }
        ],
        onChange: action => handleDialogAction(action),
        onCancel: () => handleDialogAction("decline")
      })
    ),
    React.createElement(
      g,
      { marginLeft: 3 },
      React.createElement(
        _,
        { dimColor: true },
        keyboardShortcuts.pending
          ? React.createElement(
              React.Fragment,
              null,
              "Press ",
              keyboardShortcuts.keyName,
              " again to exit"
            )
          : React.createElement(
              React.Fragment,
              null,
              "Enter to confirm · Esc to exit"
            )
      )
    )
  );
}

module.exports = BypassPermissionsModeDialog;