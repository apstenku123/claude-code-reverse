/**
 * Renders a visual indicator that a 'thinking' process is occurring, optionally with a top margin.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.param - Contains the 'thinking' content to display.
 * @param {string} options.param.thinking - The text or content representing the thinking process.
 * @param {boolean} [options.addMargin=false] - Whether to add a top margin to the indicator.
 * @returns {React.ReactElement|null} The rendered thinking indicator component, or null if no content is provided.
 */
function renderThinkingIndicator({
  param: {
    thinking: thinkingContent
  },
  addMargin: addTopMargin = false
}) {
  // If there is no thinking content, render nothing
  if (!thinkingContent) return null;

  // Get the current theme'createInteractionAccessor stylesheet for consistent styling
  const themeStyles = getThemeStylesheet().secondaryText;

  // Render the thinking indicator with optional margin and formatted content
  return _11.default.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      marginTop: addTopMargin ? 1 : 0,
      width: "100%"
    },
    // Header line with 'Thinking…' in italic and secondary text color
    _11.default.createElement(
      _,
      {
        color: themeStyles,
        italic: true
      },
      "✻ Thinking…"
    ),
    // Indented line with the processed thinking content
    _11.default.createElement(
      g,
      {
        paddingLeft: 2
      },
      _11.default.createElement(
        _,
        {
          color: themeStyles,
          italic: true
        },
        processAndFormatTokens(thinkingContent)
      )
    )
  );
}

module.exports = renderThinkingIndicator;