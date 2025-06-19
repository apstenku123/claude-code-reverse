/**
 * Renders a 'Thinking…' message with optional margin and formatted content.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.param - Contains the 'thinking' string to display.
 * @param {string} options.param.thinking - The text content to be processed and displayed.
 * @param {boolean} [options.addMargin=false] - Whether to add a top margin to the message.
 * @returns {React.ReactElement|null} The rendered React element, or null if no thinking text is provided.
 */
function renderThinkingMessage({
  param: {
    thinking: thinkingText
  },
  addMargin: addMargin = false
}) {
  // If there is no thinking text, render nothing
  if (!thinkingText) return null;

  // Get the current theme'createInteractionAccessor stylesheet for color values
  const themeStyles = getThemeStylesheet();

  // Render the message container
  return _11.default.createElement(
    g, // Container component (likely a Box or View)
    {
      flexDirection: "column",
      gap: 1,
      marginTop: addMargin ? 1 : 0,
      width: "100%"
    },
    // Render the '✻ Thinking…' label
    _11.default.createElement(
      _, // Text component
      {
        color: themeStyles.secondaryText,
        italic: true
      },
      "✻ Thinking…"
    ),
    // Render the formatted thinking text, indented
    _11.default.createElement(
      g, // Indented container
      {
        paddingLeft: 2
      },
      _11.default.createElement(
        _, // Text component
        {
          color: themeStyles.secondaryText,
          italic: true
        },
        processAndFormatTokens(thinkingText)
      )
    )
  );
}

module.exports = renderThinkingMessage;