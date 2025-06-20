/**
 * Returns a React element representing the welcome banner for Claude Code.
 * The banner includes a colored star icon and a welcome message, styled according to the current theme.
 *
 * @returns {React.ReactElement} The welcome banner React element.
 */
function getWelcomeBannerElement() {
  // Retrieve the current theme'createInteractionAccessor stylesheet object
  const themeStylesheet = getThemeStylesheet();

  // Render the welcome banner with a colored star and welcome text
  return q0.default.createElement(
    _,
    null,
    q0.default.createElement(
      _,
      { color: themeStylesheet.claude },
      '✻ '
    ),
    q0.default.createElement(
      _,
      null,
      'Welcome to Claude Code'
    )
  );
}

module.exports = getWelcomeBannerElement;