/**
 * Renders a user prompt message in a styled row layout for the CLI UI.
 * Displays a prompt symbol and the user'createInteractionAccessor message, applying theme styles and optional margin.
 *
 * @param {Object} options - Options for rendering the prompt message.
 * @param {boolean} options.addMargin - Whether to add a top margin to the row.
 * @param {Object} options.param - Parameters for the prompt message.
 * @param {string} options.param.text - The user prompt message to display.
 * @returns {React.ReactElement|null} The rendered prompt message row, or null if no message is provided.
 */
function renderUserPromptMessage({
  addMargin,
  param: { text: promptText }
}) {
  // Get the current terminal column width
  const { columns: terminalColumns } = Z4();

  // If there is no prompt text, log an error and return null
  if (!promptText) {
    reportErrorIfAllowed(new Error("No content found in user prompt message"));
    return null;
  }

  // Get the current theme'createInteractionAccessor stylesheet
  const themeStyles = getThemeStylesheet();

  // Render the prompt row with a prompt symbol and the user'createInteractionAccessor message
  return Vu.default.createElement(
    g,
    {
      flexDirection: "row",
      marginTop: addMargin ? 1 : 0,
      width: "100%"
    },
    // Prompt symbol (e.g., '>')
    Vu.default.createElement(
      g,
      {
        minWidth: 2,
        width: 2
      },
      Vu.default.createElement(_, {
        color: themeStyles.secondaryText
      }, ">")
    ),
    // User'createInteractionAccessor prompt message
    Vu.default.createElement(
      g,
      {
        flexDirection: "column",
        width: terminalColumns - 4 // Leave space for the prompt symbol and padding
      },
      Vu.default.createElement(_, {
        color: themeStyles.secondaryText,
        wrap: "wrap"
      }, promptText.trim())
    )
  );
}

module.exports = renderUserPromptMessage;