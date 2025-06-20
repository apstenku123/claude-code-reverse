/**
 * Displays a configuration error prompt UI when an invalid JSON configuration file is detected.
 * Allows the user to either exit and fix the file manually or reset with a default configuration.
 * Handles keyboard events for exiting and manages UI state for pending actions.
 *
 * @param {Object} params - The parameters for the error prompt.
 * @param {string} params.filePath - The path to the configuration file with invalid JSON.
 * @param {string} params.errorDescription - a description of the JSON error encountered.
 * @param {Function} params.onExit - Callback to execute when the user chooses to exit.
 * @param {Function} params.onReset - Callback to execute when the user chooses to reset the configuration.
 * @returns {React.ReactElement} The rendered configuration error prompt UI.
 */
function ConfigurationErrorPrompt({
  filePath,
  errorDescription,
  onExit,
  onReset
}) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent UI styling
  const themeStylesheet = getThemeStylesheet();

  // Listen for keyboard events (e.g., Escape key to exit)
  D0((input, key) => {
    if (key.escape) {
      onExit();
    }
  });

  // Get the current UI state (e.g., pending actions, key names)
  const uiState = useCtrlKeyActionHandler();

  /**
   * Handles the user'createInteractionAccessor selection from the options menu.
   * Calls the appropriate callback based on the selected value.
   * @param {string} selectedOption - The value of the selected option ('exit' or 'reset').
   */
  const handleOptionChange = (selectedOption) => {
    if (selectedOption === "exit") {
      onExit();
    } else {
      onReset();
    }
  };

  // Render the configuration error prompt UI
  return $zA.default.createElement(
    $zA.default.Fragment,
    null,
    $zA.default.createElement(
      g,
      {
        flexDirection: "column",
        borderColor: themeStylesheet.error,
        borderStyle: "round",
        padding: 1,
        width: 70,
        gap: 1
      },
      $zA.default.createElement(
        _,
        { bold: true },
        "Configuration Error"
      ),
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
        $zA.default.createElement(
          _,
          null,
          errorDescription
        )
      ),
      $zA.default.createElement(
        g,
        { flexDirection: "column" },
        $zA.default.createElement(
          _,
          { bold: true },
          "Choose an option:"
        ),
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
    // If an action is pending, show a hint to press the key again to exit
    uiState.pending
      ? $zA.default.createElement(
          _,
          { dimColor: true },
          "Press ",
          uiState.keyName,
          " again to exit"
        )
      : $zA.default.createElement(RG, null)
  );
}

module.exports = ConfigurationErrorPrompt;