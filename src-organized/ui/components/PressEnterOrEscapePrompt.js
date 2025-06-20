/**
 * Renders a prompt instructing the user to press Enter to continue or Esc to exit.
 * Sets up keyboard event handlers for Enter and Escape keys.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onPress - Callback to invoke when Enter is pressed.
 * @returns {React.ReactElement} The rendered prompt element.
 */
function PressEnterOrEscapePrompt({ onPress }) {
  // Set up keyboard event handling
  D0((eventConfig, eventState) => {
    // If the 'return' (Enter) key is pressed, call the onPress callback
    if (eventState.return) {
      onPress();
    } 
    // If the 'escape' (Esc) key is pressed, call the Q7 handler with argument 1
    else if (eventState.escape) {
      Q7(1);
    }
  });

  // Render the prompt UI
  return m2.default.createElement(
    _,
    null,
    "Press ",
    m2.default.createElement(_, { bold: true }, "Enter"),
    " to continue or ",
    m2.default.createElement(_, { bold: true }, "Esc"),
    " to exit"
  );
}

module.exports = PressEnterOrEscapePrompt;