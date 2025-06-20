/**
 * Renders an icon component with the theme'createInteractionAccessor secondary text color.
 *
 * @returns {React.ReactElement} The icon React element styled with the secondary text color.
 */
function renderSecondaryTextIcon() {
  // Import React'createInteractionAccessor createElement function
  const React = Ze0.default;
  // Import the icon component to render
  const IconComponent = _;
  // Get the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet(); // getThemeStylesheet()
  // The icon'createInteractionAccessor color is set to the secondary text color from the theme
  const iconColor = themeStylesheet.secondaryText;
  // The icon'createInteractionAccessor children/content
  const iconContent = De0;

  // Render the icon with the specified color and content
  return React.createElement(IconComponent, { color: iconColor }, iconContent);
}

// Export the function for use in other modules
module.exports = renderSecondaryTextIcon;