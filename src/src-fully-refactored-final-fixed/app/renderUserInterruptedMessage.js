/**
 * Renders a message indicating that the process was interrupted by the user.
 * This component displays a single-line message styled with the error color from the current theme.
 *
 * @returns {React.ReactElement} a React element displaying the interruption message.
 */
function renderUserInterruptedMessage() {
  // Retrieve the current theme'createInteractionAccessor stylesheet to access error color
  const themeStylesheet = getThemeStylesheet();

  // Render a container with height 1, containing the error message styled appropriately
  return React.createElement(
    ContainerComponent, // Outer container component
    { height: 1 },
    React.createElement(
      TextComponent, // Text component for displaying the message
      { color: themeStylesheet.error },
      "Interrupted by user"
    )
  );
}

module.exports = renderUserInterruptedMessage;