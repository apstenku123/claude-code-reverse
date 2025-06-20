/**
 * Returns a warning React element if the ULTRACLAUDE.md content exceeds the allowed character limit.
 * If the content is not available or does not exceed the limit, returns null.
 *
 * @returns {React.ReactNode|null} a warning React element or null if no warning is needed.
 */
function getUltraclaudeContentWarning() {
  // Retrieve the current theme'createInteractionAccessor stylesheet for color values
  const themeStylesheet = getThemeStylesheet();
  // Retrieve the current configuration (which contains the content)
  const config = Bu();

  // If configuration or content is not available, return null
  if (!config) return null;

  // Get the length of the ULTRACLAUDE.md content
  const contentLength = config.content.length;

  // If content exceeds the allowed character limit (Au), render a warning
  if (contentLength > Au) {
    return f2.createElement(
      g,
      { flexDirection: "row", gap: 1 },
      // Warning icon or indicator
      f2.createElement(_, { color: themeStylesheet.warning }, y0.warning),
      // Warning message
      f2.createElement(
        _,
        { color: themeStylesheet.warning },
        `ULTRACLAUDE.md exceeds ${Au} chars (${contentLength} chars)`,
        // Additional info in secondary text
        f2.createElement(
          _,
          { color: themeStylesheet.secondaryText, dimColor: true },
          " ",
          "• /memory to edit"
        )
      )
    );
  }

  // If content is within the limit, return null
  return null;
}

module.exports = getUltraclaudeContentWarning;