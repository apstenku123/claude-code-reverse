/**
 * Renders a stylized ASCII art banner using the current theme'createInteractionAccessor color.
 *
 * This component displays a multi-line ASCII art banner, styled according to the current theme'createInteractionAccessor color palette.
 * It uses flex layout to arrange its content in a column, aligned to the flex-start.
 *
 * @returns {React.ReactElement} a React element containing the themed ASCII art banner.
 */
function AsciiArtBanner() {
  // Retrieve the current theme'createInteractionAccessor stylesheet (e.g., color palette)
  const themeStylesheet = getThemeStylesheet();

  // Return a flex container with the ASCII art banner, colored by the theme
  return BAA.default.createElement(
    g, // Flex container component
    {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    BAA.default.createElement(
      _, // Text component
      {
        color: themeStylesheet.claude // Use the 'claude' color from the theme
      },
      // Multi-line ASCII art banner
      ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██╔══██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██████╗ ██████╗ ███████╗                
██╔════╝██╔═══██╗██╔══██╗██╔════╝                
██║     ██║   ██║██║  ██║█████╗                  
██║     ██║   ██║██║  ██║██╔══╝                  
╚██████╗╚██████╔╝██████╔╝███████╗                
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝`
    )
  );
}

module.exports = AsciiArtBanner;