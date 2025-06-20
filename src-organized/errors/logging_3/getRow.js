/**
 * Checks if the current content length exceeds the maximum allowed characters and returns a warning React element if so.
 *
 * @returns {React.ReactElement|null} a warning React element if content exceeds the maximum allowed length, otherwise null.
 */
function getRow() {
  // Get the current theme stylesheet
  const themeStylesheet = getThemeStylesheet();
  // Get the current content configuration
  const contentConfig = Bu();

  // If there is no content configuration, return null
  if (!contentConfig) return null;

  // Get the length of the content
  const contentLength = contentConfig.content.length;

  // If content exceeds the allowed maximum, show a warning message
  if (contentLength > Au) {
    return f2.createElement(
      g,
      {
        flexDirection: "row",
        gap: 1
      },
      // Warning icon
      f2.createElement(_, {
        color: themeStylesheet.warning
      }, y0.warning),
      // Warning message
      f2.createElement(
        _,
        { color: themeStylesheet.warning },
        `ULTRACLAUDE.md exceeds ${Au} chars (${contentLength} chars)`,
        // Additional info in secondary text
        f2.createElement(
          _,
          {
            color: themeStylesheet.secondaryText,
            dimColor: true
          },
          " ",
          "• /memory to edit"
        )
      )
    );
  }

  // If content is within allowed length, return null
  return null;
}

module.exports = getRow;