/**
 * Renders a warning message box with optional top margin, styled according to the current theme and terminal width.
 *
 * @param {Object} params - The parameters for rendering the warning message.
 * @param {Object} params.message - The message object containing the content to display.
 * @param {string} params.message.content - The warning message text to display.
 * @param {boolean} params.addMargin - Whether to add a top margin to the message box.
 * @returns {React.ReactElement} The rendered warning message box component.
 */
function WarningMessageBox({
  message,
  addMargin
}) {
  // Get terminal dimensions (e.g., columns)
  const { columns: terminalColumns } = Z4();

  // Extract the warning message content
  const warningText = message.content;

  // Get the current theme'createInteractionAccessor stylesheet for warning color
  const themeStylesheet = getThemeStylesheet();

  // Render the warning message box with appropriate styling and layout
  return sj.createElement(
    g, // Outer flex row container
    {
      flexDirection: "row",
      marginTop: addMargin ? 1 : 0,
      width: "100%"
    },
    sj.createElement(
      g, // Inner flex column container
      {
        flexDirection: "column",
        width: terminalColumns - 10 // Leave padding for terminal borders
      },
      sj.createElement(
        _, // Text component with warning color
        {
          color: themeStylesheet.warning,
          wrap: "wrap"
        },
        warningText.trim()
      )
    )
  );
}

module.exports = WarningMessageBox;