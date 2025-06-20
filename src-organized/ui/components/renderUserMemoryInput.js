/**
 * Renders a UI component displaying the user'createInteractionAccessor memory input, styled according to the current theme.
 * If the memory input is not present, returns null.
 *
 * @param {Object} options - The options for rendering.
 * @param {Object} options.param - Contains the text to display.
 * @param {string} options.param.text - The user'createInteractionAccessor memory input text.
 * @param {boolean} options.addMargin - Whether to add a top margin to the component.
 * @returns {React.ReactElement|null} The rendered memory input component, or null if no input is present.
 */
function renderUserMemoryInput({
  param: {
    text: userMemoryText
  },
  addMargin: addMarginTop
}) {
  // Attempt to extract the user memory input value
  const userMemoryValue = fG(userMemoryText, "user-memory-input");
  if (!userMemoryValue) return null;

  // Get the current theme'createInteractionAccessor color palette
  const themeColors = getThemeStylesheet();

  // Render the memory input UI
  return lF.createElement(
    g,
    {
      flexDirection: "column",
      marginTop: addMarginTop ? 1 : 0,
      width: "100%"
    },
    // First row: memory icon and value
    lF.createElement(
      g,
      null,
      lF.createElement(_, { color: themeColors.remember }, "#"),
      lF.createElement(_, { color: themeColors.remember }, " ", userMemoryValue)
    ),
    // Divider row
    lF.createElement(
      ConditionalRowContainer,
      { height: 1 },
      lF.createElement(_, { dimColor: true }, _W5())
    )
  );
}

module.exports = renderUserMemoryInput;