/**
 * Renders a prompt instructing the user to press Enter to continue or Esc to exit.
 * Sets up keyboard event handlers to handle Enter (onPress) and Escape (graceful shutdown).
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onPress - Callback to execute when Enter is pressed.
 * @returns {React.Element} The rendered prompt React element.
 */
function renderContinueOrExitPrompt({ onPress }) {
  // Set up keyboard event handlers using D0
  D0((keyboardEventConfig, keyboardEventSubscription) => {
    // If the user presses Enter (represented by 'return')
    if (keyboardEventSubscription.return) {
      onPress();
    }
    // If the user presses Escape
    else if (keyboardEventSubscription.escape) {
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

module.exports = renderContinueOrExitPrompt;