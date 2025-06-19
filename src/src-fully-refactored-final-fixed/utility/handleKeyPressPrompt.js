/**
 * Renders a prompt instructing the user to press Enter to continue or Esc to exit, and sets up key event handlers.
 *
 * @param {Object} options - The options object.
 * @param {Function} options.onPress - Callback function to execute when the Enter key is pressed.
 * @returns {React.Element} The rendered prompt component.
 */
function handleKeyPressPrompt({ onPress }) {
  // Set up key event handler using D0 (external dependency)
  D0((config, subscription) => {
    // If the 'return' key is pressed, execute the onPress callback
    if (subscription.return) {
      onPress();
    } 
    // If the 'escape' key is pressed, call Q7 with argument 1 (external dependency)
    else if (subscription.escape) {
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

module.exports = handleKeyPressPrompt;