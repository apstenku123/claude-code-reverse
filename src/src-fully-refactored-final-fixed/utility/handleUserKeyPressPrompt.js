/**
 * Renders a prompt instructing the user to press Enter to continue or Esc to exit.
 * Sets up keypress event handling: calls the provided onPress callback when Enter is pressed,
 * or triggers a graceful shutdown when Escape is pressed.
 *
 * @param {Object} params - The function parameters.
 * @param {Function} params.onPress - Callback to invoke when the user presses Enter.
 * @returns {React.ReactElement} The rendered prompt component.
 */
function handleUserKeyPressPrompt({ onPress }) {
  // Register key event handlers using D0 (external event registration function)
  D0((eventConfig, keyEvent) => {
    // If the 'return' (Enter) key is pressed, call the onPress callback
    if (keyEvent.return) {
      onPress();
    } 
    // If the 'escape' (Esc) key is pressed, perform a graceful shutdown
    else if (keyEvent.escape) {
      performGracefulShutdown(1);
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

module.exports = handleUserKeyPressPrompt;