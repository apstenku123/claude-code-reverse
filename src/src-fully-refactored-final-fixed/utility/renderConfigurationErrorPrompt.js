/**
 * Renders a configuration error prompt UI when an invalid JSON configuration file is detected.
 * Provides options to exit and fix manually or reset with default configuration.
 * Handles keyboard events for exiting and manages UI state for pending actions.
 *
 * @param {Object} params - The parameters for rendering the error prompt.
 * @param {string} params.filePath - The path to the configuration file with the error.
 * @param {string} params.errorDescription - The description of the configuration error.
 * @param {Function} params.onExit - Callback to invoke when the user chooses to exit.
 * @param {Function} params.onReset - Callback to invoke when the user chooses to reset the configuration.
 * @returns {React.ReactElement} The rendered configuration error prompt UI.
 */
function renderConfigurationErrorPrompt({
  filePath,
  errorDescription,
  onExit,
  onReset
}) {
  // Retrieve theme styles for error highlighting
  const themeStyles = getThemeStylesheet();

  // Listen for keyboard events (e.g., escape key to exit)
  D0((input, key) => {
    if (key.escape) {
      onExit();
    }
  });

  // Get UI state for pending actions (e.g., double-press to exit)
  const pendingExitState = useCtrlKeyActionHandler();

  // Handle option selection from the prompt
  const handleOptionChange = (selectedValue) => {
    if (selectedValue === "exit") {
      onExit();
    } else {
      onReset();
    }
  };

  // Render the error prompt UI
  return $zA.default.createElement(
    $zA.default.Fragment,
    null,
    $zA.default.createElement(
      g,
      {
        flexDirection: "column",
        borderColor: themeStyles.error,
        borderStyle: "round",
        padding: 1,
        width: 70,
        gap: 1
      },
      $zA.default.createElement(_, { bold: true }, "Configuration Error"),
      $zA.default.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        $zA.default.createElement(
          _,
          null,
          "The configuration file at ",
          $zA.default.createElement(_, { bold: true }, filePath),
          " contains invalid JSON."
        ),
        $zA.default.createElement(_, null, errorDescription)
      ),
      $zA.default.createElement(
        g,
        { flexDirection: "column" },
        $zA.default.createElement(_, { bold: true }, "Choose an option:"),
        $zA.default.createElement(SelectableOptionsList, {
          options: [
            {
              label: "Exit and fix manually",
              value: "exit"
            },
            {
              label: "Reset with default configuration",
              value: "reset"
            }
          ],
          onChange: handleOptionChange,
          onCancel: onExit
        })
      )
    ),
    // Show pending exit message if applicable
    pendingExitState.pending
      ? $zA.default.createElement(_, { dimColor: true }, "Press ", pendingExitState.keyName, " again to exit")
      : $zA.default.createElement(RG, null)
  );
}

module.exports = renderConfigurationErrorPrompt;