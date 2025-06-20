/**
 * Renders a configuration error prompt UI when the configuration file contains invalid JSON.
 * Provides options to exit and fix manually or reset with default configuration.
 * Handles keyboard events for exiting and displays pending exit instructions if necessary.
 *
 * @param {Object} params - The parameters for rendering the error prompt.
 * @param {string} params.filePath - The path to the configuration file with invalid JSON.
 * @param {string} params.errorDescription - The description of the configuration error.
 * @param {Function} params.onExit - Callback to invoke when the user chooses to exit.
 * @param {Function} params.onReset - Callback to invoke when the user chooses to reset the configuration.
 * @returns {React.ReactElement} The rendered configuration error prompt UI.
 */
function renderConfigErrorPrompt({
  filePath,
  errorDescription,
  onExit,
  onReset
}) {
  // Get the current theme'createInteractionAccessor stylesheet for error colors
  const themeStylesheet = getThemeStylesheet();

  // Register a global key handler for the escape key to trigger exit
  D0((input, key) => {
    if (key.escape) {
      onExit();
    }
  });

  // Get the pending exit state and key name for double-press exit
  const exitPromptState = useCtrlKeyActionHandler();

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
    // Show a pending exit message if user needs to press the key again
    exitPromptState.pending
      ? $zA.default.createElement(
          _,
          { dimColor: true },
          "Press ",
          exitPromptState.keyName,
          " again to exit"
        )
      : $zA.default.createElement(RG, null)
  );
}

// Dependency mapping for clarity
// getThemeStylesheet: getThemeStylesheet
// D0: Keyboard event registration
// useCtrlKeyActionHandler: Exit prompt state
// g, _, SelectableOptionsList, RG: UI components (likely Ink or React-based)

module.exports = renderConfigErrorPrompt;