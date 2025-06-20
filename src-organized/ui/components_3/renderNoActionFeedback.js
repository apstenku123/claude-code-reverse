/**
 * Renders a feedback message indicating that no action was taken, with error styling.
 *
 * @returns {React.ReactElement} a React element displaying the feedback message.
 */
function renderNoActionFeedback() {
  // Import the theme stylesheet to access error color
  const themeStylesheet = getThemeStylesheet();

  // Render a container with height 1, containing the error message styled appropriately
  return Go.createElement(
    FeedbackContainer, // Outer container component
    { height: 1 },
    Go.createElement(
      FeedbackText, // Text component for feedback
      { color: themeStylesheet.error },
      "No (tell Claude what to do differently)"
    )
  );
}

module.exports = renderNoActionFeedback;