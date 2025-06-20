/**
 * Renders a status icon or component based on the current tool mode.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.mode - The current mode of the tool. Can be one of: 'tool-input', 'tool-use', 'responding', 'thinking', 'requesting'.
 * @returns {React.ReactElement|null} The corresponding React element for the given mode, or null if mode is unrecognized.
 */
function renderToolStatusIcon({ mode }) {
  // Import dependencies (assumed to be in scope)
  // J9: React or compatible library with createElement
  // AnimatedHammerIcon: React component for tool input
  // g: Layout component (e.g., Box, Flex)
  // _: Icon or Text component
  // getThemeStylesheet: Function to get theme styles
  // y0: Object with arrow icons

  const theme = getThemeStylesheet(); // Get the current theme styles

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
          { color: theme.secondaryText },
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
          { color: theme.secondaryText },
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
          { color: theme.secondaryText },
          y0.arrowUp
        )
      );
    default:
      // If mode is unrecognized, render nothing
      return null;
  }
}

module.exports = renderToolStatusIcon;