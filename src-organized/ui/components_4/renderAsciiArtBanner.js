/**
 * Renders an ASCII art banner using the current theme'createInteractionAccessor color.
 *
 * This function retrieves the current theme'createInteractionAccessor stylesheet, then renders a React element
 * containing a styled ASCII art banner. The banner is displayed in a flex column layout,
 * aligned to the flex-start. The color of the ASCII art is set based on the 'claude' property
 * from the current theme'createInteractionAccessor stylesheet.
 *
 * @returns {React.ReactElement} a React element displaying the themed ASCII art banner.
 */
function renderAsciiArtBanner() {
  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet();

  // ASCII art banner to display
  const asciiArtBanner = ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
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

  // Render the banner inside a flex column container, using the theme'createInteractionAccessor color
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
      asciiArtBanner
    )
  );
}

// Export the function as a module
module.exports = renderAsciiArtBanner;