/**
 * Renders a styled prompt instructing the user to press Enter to continue.
 *
 * @returns {ReactElement} a React element representing the prompt message.
 */
function renderContinuePrompt() {
  // Retrieve the current theme'createInteractionAccessor stylesheet to access color settings
  const themeStylesheet = getThemeStylesheet();

  // Render the prompt message with appropriate styling
  return React.createElement(
    TextComponent, // Outer text component
    { color: themeStylesheet.permission }, // Apply permission color from theme
    "Press ",
    React.createElement(
      TextComponent, // Inner text component for 'Enter'
      { bold: true }, // Make 'Enter' bold
      "Enter"
    ),
    " to continue…"
  );
}

module.exports = renderContinuePrompt;