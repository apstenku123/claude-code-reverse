/**
 * Renders a styled title element for permission-related UI sections.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title text to display.
 * @returns {React.Element} a React element containing the styled title.
 */
function renderPermissionTitle({ title }) {
  // Retrieve the stylesheet for the current theme, specifically permission-related styles
  const themeStyles = getThemeStylesheet();

  // Render a container with column flex direction, containing the bold, colored title
  return k11.createElement(
    g, // Container component (e.g., a View or Box)
    { flexDirection: "column" },
    k11.createElement(
      _, // Text component (e.g., a Typography or Text)
      {
        bold: true,
        color: themeStyles.permission // Use the permission color from the theme
      },
      title // The actual title text
    )
  );
}

module.exports = renderPermissionTitle;