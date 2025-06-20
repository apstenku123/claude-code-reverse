/**
 * Renders a prompt instructing the user to press Enter to continue or Esc to exit.
 * Sets up event handlers for 'return' (Enter) and 'escape' (Esc) key events.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onPress - Callback to invoke when Enter is pressed.
 * @returns {React.Element} The rendered prompt element.
 */
function handlePressOrEscapePrompt({ onPress }) {
  // Register event handlers for Enter and Escape keys
  D0((config, subscription) => {
    if (subscription.return) {
      // If Enter is pressed, call the provided onPress callback
      onPress();
    } else if (subscription.escape) {
      // If Escape is pressed, call the Q7 handler (likely to exit)
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

module.exports = handlePressOrEscapePrompt;