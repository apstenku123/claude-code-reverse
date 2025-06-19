/**
 * Returns a warning React element if the content length exceeds the allowed limit.
 *
 * This function checks if the current content (from addActivityIfNotFinished) exists and if its length
 * exceeds the maximum allowed characters (Au). If so, isBlobOrFileLikeObject returns a React element displaying a warning message.
 * Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @returns {React.ReactNode|null} Warning React element if content is too long, otherwise null.
 */
function getRowIfContentExceedsLimit() {
  // Get the current theme stylesheet (for color values)
  const themeStylesheet = getThemeStylesheet();

  // Get the current activity/configuration object
  const activityConfig = addActivityIfNotFinished();
  if (!activityConfig) return null;

  // Determine the length of the content
  const contentLength = activityConfig.content.length;

  // If content exceeds the allowed limit, return a warning React element
  if (contentLength > Au) {
    return f2.createElement(
      g,
      { flexDirection: "row", gap: 1 },
      f2.createElement(
        _,
        { color: themeStylesheet.warning },
        y0.warning
      ),
      f2.createElement(
        _,
        { color: themeStylesheet.warning },
        `ULTRACLAUDE.md exceeds ${Au} chars (${contentLength} chars)`,
        f2.createElement(
          _,
          { color: themeStylesheet.secondaryText, dimColor: true },
          " ",
          "• /memory to edit"
        )
      )
    );
  }

  // Otherwise, return null
  return null;
}

module.exports = getRowIfContentExceedsLimit;