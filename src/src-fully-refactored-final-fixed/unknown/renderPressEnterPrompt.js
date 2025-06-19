/**
 * Renders a styled prompt message instructing the user to press Enter to continue.
 *
 * This function creates a React element (or compatible virtual DOM element) that displays:
 *   Press <bold>Enter</bold> to continue…
 * The color of the text is set based on the current theme'createInteractionAccessor permission color.
 *
 * @returns {React.ReactElement} a React element representing the prompt message.
 */
function renderPressEnterPrompt() {
  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet();

  // Extract the permission color from the stylesheet
  const permissionColor = themeStylesheet.permission;

  // Render the prompt message with styled 'Enter' text
  return no.createElement(
    _,
    { color: permissionColor },
    "Press ",
    no.createElement(_, { bold: true }, "Enter"),
    " to continue…"
  );
}

module.exports = renderPressEnterPrompt;