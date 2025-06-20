/**
 * Renders a warning message if the content length exceeds the allowed maximum.
 *
 * This function checks the current content (from Bu), and if its length exceeds the
 * configured maximum (Au), isBlobOrFileLikeObject returns a React element tree displaying a warning message.
 * Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @returns {React.ReactNode|null} Warning message React element if content is too long, otherwise null.
 */
function renderContentLengthWarning() {
  // Retrieve the current theme'createInteractionAccessor color palette
  const themeStyles = getThemeStylesheet();
  // Retrieve the current content configuration
  const contentConfig = Bu();

  // If there is no content configuration, do not render anything
  if (!contentConfig) return null;

  const contentLength = contentConfig.content.length;

  // If the content length exceeds the maximum allowed, render a warning message
  if (contentLength > Au) {
    return f2.createElement(
      g,
      {
        flexDirection: "row",
        gap: 1
      },
      // Warning icon or symbol
      f2.createElement(_, {
        color: themeStyles.warning
      }, y0.warning),
      // Main warning message
      f2.createElement(
        _,
        { color: themeStyles.warning },
        `ULTRACLAUDE.md exceeds ${Au} chars (${contentLength} chars)`,
        // Additional info in secondary text
        f2.createElement(
          _,
          {
            color: themeStyles.secondaryText,
            dimColor: true
          },
          " ",
          "• /memory to edit"
        )
      )
    );
  }

  // If content length is within limits, render nothing
  return null;
}

module.exports = renderContentLengthWarning;