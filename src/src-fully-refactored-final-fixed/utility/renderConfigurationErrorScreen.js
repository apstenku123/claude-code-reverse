/**
 * Renders a configuration error screen with options to exit or reset configuration.
 *
 * @param {Object} params - The parameters for rendering the error screen.
 * @param {string} params.filePath - The path to the configuration file that caused the error.
 * @param {string} params.errorDescription - a description of the configuration error.
 * @param {Function} params.onExit - Callback to execute when the user chooses to exit.
 * @param {Function} params.onReset - Callback to execute when the user chooses to reset the configuration.
 * @returns {React.ReactElement} The rendered configuration error screen component.
 */
function renderConfigurationErrorScreen({
  filePath,
  errorDescription,
  onExit,
  onReset
}) {
  // Get the current theme'createInteractionAccessor error color for styling
  const themeStyles = getThemeStylesheet();

  // Listen for escape key to trigger exit
  D0((input, key) => {
    if (key.escape) {
      onExit();
    }
  });

  // Get the current keypress state (e.g., for double-press exit)
  const keyPressState = useCtrlKeyActionHandler();

  // Handle option selection from the user
  const handleOptionChange = (selectedValue) => {
    if (selectedValue === "exit") {
      onExit();
    } else {
      onReset();
    }
  };

  // Render the error UI
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
    // Show a hint if a key is pending (e.g., for double-press exit)
    keyPressState.pending
      ? $zA.default.createElement(
          _,
          { dimColor: true },
          "Press ",
          keyPressState.keyName,
          " again to exit"
        )
      : $zA.default.createElement(RG, null)
  );
}

module.exports = renderConfigurationErrorScreen;