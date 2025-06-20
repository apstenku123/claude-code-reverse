/**
 * Displays a warning dialog for Bypass Permissions mode, handles user acceptance or decline,
 * and manages related side effects such as analytics events and config updates.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onAccept - Callback invoked when the user accepts Bypass Permissions mode.
 * @returns {React.ReactElement} The rendered dialog component.
 */
function showBypassPermissionsDialog({ onAccept }) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Fire analytics event when dialog is shown
  mI.default.useEffect(() => {
    logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_shown", {});
  }, []);

  /**
   * Handles user selection from the dialog options.
   * @param {string} userChoice - The user'createInteractionAccessor choice ("accept" or "decline").
   */
  function handleDialogChoice(userChoice) {
    const cachedConfig = getCachedConfig();
    switch (userChoice) {
      case "accept": {
        // Fire analytics event and update config to reflect acceptance
        logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_accept", {});
        updateProjectsAccessor({
          ...cachedConfig,
          bypassPermissionsModeAccepted: true
        });
        onAccept();
        break;
      }
      case "decline": {
        // Close dialog with decline code
        Q7(1);
        break;
      }
      default:
        break;
    }
  }

  // Get keyboard interaction state
  const keyboardState = useCtrlKeyActionHandler();

  // Listen for global escape key to close dialog
  D0((_, keyState) => {
    if (keyState.escape) {
      Q7(0);
      return;
    }
  });

  // Render the dialog UI
  return mI.default.createElement(
    mI.default.Fragment,
    null,
    mI.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.error
      },
      mI.default.createElement(
        _,
        { bold: true, color: theme.error },
        "WARNING: ",
        m0,
        " running in Bypass Permissions mode"
      ),
      mI.default.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        mI.default.createElement(
          _,
          null,
          "In Bypass Permissions mode, ",
          m0,
          " will not ask for your approval before running potentially dangerous commands.",
          mI.default.createElement(RG, null),
          "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."
        ),
        mI.default.createElement(
          _,
          null,
          "resolvePropertyPath proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."
        ),
        mI.default.createElement(
          renderLinkOrText,
          { url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security" }
        )
      ),
      mI.default.createElement(
        SelectableOptionsList,
        {
          options: [
            { label: "No, exit", value: "decline" },
            { label: "Yes, createObjectTracker accept", value: "accept" }
          ],
          onChange: choice => handleDialogChoice(choice),
          onCancel: () => handleDialogChoice("decline")
        }
      )
    ),
    mI.default.createElement(
      g,
      { marginLeft: 3 },
      mI.default.createElement(
        _,
        { dimColor: true },
        keyboardState.pending
          ? mI.default.createElement(
              mI.default.Fragment,
              null,
              "Press ",
              keyboardState.keyName,
              " again to exit"
            )
          : mI.default.createElement(
              mI.default.Fragment,
              null,
              "Enter to confirm · Esc to exit"
            )
      )
    )
  );
}

module.exports = showBypassPermissionsDialog;