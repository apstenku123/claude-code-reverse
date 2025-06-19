/**
 * Renders a panel displaying setup warnings and instructions, allowing the user to continue or exit.
 *
 * @param {Object} params - The parameters for the panel.
 * @param {Array<Object>} params.warnings - List of warning objects to display. Each warning should have a 'title', 'message', and 'instructions' array.
 * @param {Function} params.onContinue - Callback to invoke when the user chooses to continue (e.g., presses Enter).
 * @returns {React.ReactElement} The rendered setup warnings panel.
 */
function SetupWarningsPanel({
  warnings,
  onContinue
}) {
  // Retrieve theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  // Register a handler to listen for the user'createInteractionAccessor action to continue
  D0((input, inputState) => {
    // If the input stream is being closed (e.g., user pressed Enter), invoke the continue callback
    if (inputState.return) {
      onContinue();
    }
  });

  // Render the warnings panel UI
  return qW.default.createElement(
    qW.default.Fragment,
    null,
    qW.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: themeStyles.secondaryBorder,
        paddingX: 1
      },
      // Header section
      qW.default.createElement(
        g,
        {
          flexDirection: "column",
          marginBottom: 1
        },
        qW.default.createElement(
          _,
          { bold: true },
          y0.warning,
          " Setup Warnings"
        ),
        qW.default.createElement(
          _,
          { dimColor: true },
          "We found some potential issues, but you can continue anyway"
        )
      ),
      // List of warnings
      warnings.map((warning, warningIndex) =>
        qW.default.createElement(
          g,
          {
            key: warningIndex,
            flexDirection: "column",
            marginBottom: 1
          },
          qW.default.createElement(
            _,
            { color: "yellow", bold: true },
            warning.title
          ),
          qW.default.createElement(
            _,
            null,
            warning.message
          ),
          warning.instructions.length > 0 &&
            qW.default.createElement(
              g,
              {
                flexDirection: "column",
                marginLeft: 2,
                marginTop: 1
              },
              warning.instructions.map((instruction, instructionIndex) =>
                qW.default.createElement(
                  _,
                  { key: instructionIndex, dimColor: true },
                  "• ",
                  instruction
                )
              )
            )
        )
      ),
      // Footer prompt
      qW.default.createElement(
        g,
        { marginTop: 1 },
        qW.default.createElement(
          _,
          { bold: true, color: themeStyles.permission },
          "Press Enter to continue anyway, or Ctrl+C to exit and fix issues"
        )
      )
    )
  );
}

module.exports = SetupWarningsPanel;