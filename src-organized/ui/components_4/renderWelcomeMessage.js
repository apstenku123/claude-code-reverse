/**
 * Renders a welcome message for Claude Code with a themed icon.
 *
 * This function retrieves the current theme colors using the getThemeColors accessor (getThemeStylesheet),
 * and returns a React element tree that displays a star icon (✻) in the Claude theme color,
 * followed by the text "Welcome to Claude Code".
 *
 * @returns {React.ReactElement} a React element containing the welcome message with themed icon.
 */
function renderWelcomeMessage() {
  // Retrieve the current theme colors (assumed to have a 'claude' property for color)
  const themeColors = getThemeStylesheet();

  // Render the welcome message with a themed star icon
  return q0.default.createElement(
    _,
    null,
    q0.default.createElement(
      _,
      { color: themeColors.claude },
      "✻ "
    ),
    q0.default.createElement(
      _,
      null,
      "Welcome to Claude Code"
    )
  );
}

module.exports = renderWelcomeMessage;