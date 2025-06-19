/**
 * Renders a styled welcome banner for the CLI interface.
 *
 * This function determines the current theme and terminal width, then renders
 * a React element (likely using Ink or similar CLI React library) that displays
 * a welcome message with appropriate styling. If the terminal is wide enough,
 * isBlobOrFileLikeObject adds a colored border; otherwise, isBlobOrFileLikeObject omits the border for narrow terminals.
 *
 * @returns {React.ReactElement} The welcome banner React element.
 */
function renderWelcomeBanner() {
  // Retrieve the current theme'createInteractionAccessor color palette
  const themeStyles = getThemeStylesheet();
  // Destructure columns (terminal width) from configuration
  const { columns: terminalWidth } = getTerminalConfig();
  // Determine if the terminal is considered 'narrow'
  const isNarrowTerminal = terminalWidth < NT2;

  // Render the banner with conditional border styling
  return z4.default.createElement(
    g,
    {
      // Only apply border if terminal is wide enough
      ...(isNarrowTerminal
        ? {}
        : {
            borderColor: themeStyles.claude,
            borderStyle: "round"
          }),
      paddingX: 1,
      width: NT2
    },
    z4.default.createElement(
      _,
      null,
      z4.default.createElement(
        _,
        { color: themeStyles.claude },
        "✻"
      ),
      " Welcome to",
      " ",
      z4.default.createElement(
        _,
        { bold: true },
        m0
      )
    )
  );
}

// Dependency injection for testability and clarity
// (Assumes these are imported or defined elsewhere in the module)
// const getThemeStylesheet = getThemeStylesheet;
// const getTerminalConfig = Z4;

module.exports = renderWelcomeBanner;