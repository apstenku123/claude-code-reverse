/**
 * Renders an ASCII art banner using the current theme'createInteractionAccessor color.
 *
 * This function retrieves the current theme'createInteractionAccessor stylesheet and displays
 * a stylized ASCII art banner inside a flex container, using React elements.
 *
 * @returns {React.ReactElement} a React element containing the ASCII art banner styled with the theme color.
 */
function AsciiBannerDisplay() {
  // Retrieve the current theme'createInteractionAccessor stylesheet (e.g., color palette)
  const themeStylesheet = getThemeStylesheet();

  // ASCII art banner to be displayed
  const asciiBanner = ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██████╗ ██████╗ ███████╗                
██╔════╝██╔═══██╗██╔══██╗██╔════╝                
██║     ██║   ██║██║  ██║█████╗                  
██║     ██║   ██║██║  ██║██╔══╝                  
╚██████╗╚██████╔╝██████╔╝███████╗                
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝`;

  // Render the ASCII banner inside a flex container, using the theme'createInteractionAccessor 'claude' color
  return BAA.default.createElement(
    g, // Flex container component
    {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    BAA.default.createElement(
      _, // Text component
      {
        color: themeStylesheet.claude
      },
      asciiBanner
    )
  );
}

// Export the function as a CommonJS module
module.exports = AsciiBannerDisplay;