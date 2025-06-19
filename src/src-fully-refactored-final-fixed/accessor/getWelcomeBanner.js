/**
 * Renders a welcome banner for Claude Code with themed styling.
 *
 * This accessor retrieves the current theme'createInteractionAccessor stylesheet and uses its 'claude' color property
 * to style a decorative symbol in the banner. The banner is composed of React elements.
 *
 * @returns {React.ReactElement} a React element representing the themed welcome banner.
 */
function getWelcomeBanner() {
  // Retrieve the current theme'createInteractionAccessor stylesheet object
  const themeStylesheet = getThemeStylesheet();

  // Render the welcome banner using React elements
  return React.default.createElement(
    BannerContainer, // Outer container component
    null,
    React.default.createElement(
      BannerSymbol, // Symbol component
      { color: themeStylesheet.claude }, // Apply themed color
      '✻ '
    ),
    React.default.createElement(
      BannerText, // Text component
      null,
      'Welcome to Claude Code'
    )
  );
}

module.exports = getWelcomeBanner;