/**
 * Renders an icon or component based on the current interaction mode.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.mode - The current interaction mode. Can be one of:
 *   'tool-input', 'tool-use', 'responding', 'thinking', or 'requesting'.
 * @returns {React.ReactElement|null} The corresponding React element for the mode, or null if mode is unrecognized.
 */
function renderInteractionModeIcon({ mode }) {
  // Get the current theme'createInteractionAccessor stylesheet for consistent coloring
  const themeStylesheet = getThemeStylesheet();

  switch (mode) {
    case "tool-input":
      // Render the tool input component
      return J9.createElement(AnimatedHammerIcon, null);
    case "tool-use":
      // Render a flex container with a tool icon (⚒)
      return J9.createElement(
        g,
        {
          flexWrap: "wrap",
          flexGrow: 0,
          height: 1,
          width: 2
        },
        J9.createElement(
          _,
          { color: themeStylesheet.secondaryText },
          "⚒"
        )
      );
    case "responding":
    case "thinking":
      // Render a flex container with a downward arrow icon
      return J9.createElement(
        g,
        { width: 2 },
        J9.createElement(
          _,
          { color: themeStylesheet.secondaryText },
          y0.arrowDown
        )
      );
    case "requesting":
      // Render a flex container with an upward arrow icon
      return J9.createElement(
        g,
        { width: 2 },
        J9.createElement(
          _,
          { color: themeStylesheet.secondaryText },
          y0.arrowUp
        )
      );
    default:
      // If mode is unrecognized, render nothing
      return null;
  }
}

module.exports = renderInteractionModeIcon;