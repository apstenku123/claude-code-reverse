/**
 * Renders a 'Thinking…' indicator with optional top margin and themed secondary text color.
 *
 * @param {Object} options - Configuration options for the indicator.
 * @param {boolean} [options.addMargin=false] - If true, adds a top margin to the indicator.
 * @returns {React.ReactElement} The rendered 'Thinking…' indicator component.
 */
function ThinkingIndicator({ addMargin = false } = {}) {
  // Import dependencies (assumed to be required elsewhere in the module)
  // - React (aliased as it1.default)
  // - Box component (aliased as g)
  // - Text component (aliased as _)
  // - getThemeStylesheet (aliased as getThemeStylesheet)

  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet();

  // Render the indicator with optional margin and themed secondary text
  return React.createElement(
    Box,
    { marginTop: addMargin ? 1 : 0 },
    React.createElement(
      Text,
      { color: themeStylesheet.secondaryText, italic: true },
      '✻ Thinking…'
    )
  );
}

// Aliases for dependencies (to match original minified code)
const React = it1.default;
const Box = g;
const Text = _;
const getThemeStylesheet = getThemeStylesheet;

module.exports = ThinkingIndicator;