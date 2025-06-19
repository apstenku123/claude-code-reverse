/**
 * Renders a warning dialog for Bypass Permissions mode, handles user acceptance or decline,
 * and manages side effects such as logging and application shutdown.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onAccept - Callback invoked when the user accepts Bypass Permissions mode.
 * @returns {React.ReactElement} The rendered dialog component.
 */
function renderBypassPermissionsModeDialog({ onAccept }) {
  // Get the current theme'createInteractionAccessor color palette
  const themeStyles = getThemeStylesheet();

  // Log that the dialog has been shown (analytics/telemetry)
  mI.default.useEffect(() => {
    logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_shown", {});
  }, []);

  /**
   * Handles user selection from the dialog options.
   * @param {string} userChoice - The user'createInteractionAccessor choice: 'accept' or 'decline'.
   */
  function handleUserChoice(userChoice) {
    const latestConfig = getLatestConfig();
    switch (userChoice) {
      case "accept": {
        // Log acceptance, update config, and invoke the accept callback
        logTelemetryEventIfEnabled("bypass_permissions_mode_dialog_accept", {});
        updateProjectsAccessor({
          ...latestConfig,
          bypassPermissionsModeAccepted: true
        });
        onAccept();
        break;
      }
      case "decline": {
        // Gracefully shut down the application with exit code 1
        performGracefulShutdown(1);
        break;
      }
      default:
        break;
    }
  }

  // Get the current key state for dialog navigation
  const keyState = useCtrlKeyActionHandler();

  // Listen for global key events (e.g., Escape to exit)
  D0((_, keyEvent) => {
    if (keyEvent.escape) {
      // Gracefully shut down the application with exit code 0
      performGracefulShutdown(0);
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
        borderColor: themeStyles.error
      },
      mI.default.createElement(
        _,
        { bold: true, color: themeStyles.error },
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
          onChange: handleUserChoice,
          onCancel: () => handleUserChoice("decline")
        }
      )
    ),
    mI.default.createElement(
      g,
      { marginLeft: 3 },
      mI.default.createElement(
        _,
        { dimColor: true },
        keyState.pending
          ? mI.default.createElement(
              mI.default.Fragment,
              null,
              "Press ",
              keyState.keyName,
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

// Dependency injection for testability and clarity
const getThemeStylesheet = getThemeStylesheet;
const getLatestConfig = getCachedOrFreshConfig;
const performGracefulShutdown = Q7;
const updateProjectsAccessor = updateProjectsAccessor;

module.exports = renderBypassPermissionsModeDialog;