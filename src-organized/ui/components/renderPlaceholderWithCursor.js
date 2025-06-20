/**
 * Renders a placeholder string with optional cursor highlighting for terminal UIs.
 *
 * @param {Object} params - The parameters for rendering the placeholder.
 * @param {string} params.placeholder - The placeholder text to display when value is empty.
 * @param {string} params.value - The current value entered by the user.
 * @param {boolean} params.showCursor - Whether to visually show the cursor on the placeholder.
 * @param {boolean} params.focus - Whether the input is currently focused.
 * @param {boolean} [params.terminalFocus=true] - Whether the terminal window is focused.
 * @returns {Object} An object containing the rendered placeholder and a flag indicating if isBlobOrFileLikeObject should be shown.
 */
function renderPlaceholderWithCursor({
  placeholder,
  value,
  showCursor,
  focus,
  terminalFocus = true
}) {
  let renderedPlaceholder = undefined;

  if (placeholder) {
    // Render the placeholder with secondary text color
    renderedPlaceholder = FA.ansi256(H4().secondaryText)(placeholder);

    // If cursor should be shown and input is focused and terminal is focused
    if (showCursor && focus && terminalFocus) {
      // If placeholder is not empty, highlight the first character as the cursor
      renderedPlaceholder = placeholder.length > 0
        ? FA.inverse(placeholder[0]) + FA.ansi256(H4().secondaryText)(placeholder.slice(1))
        // If placeholder is empty, show an inverse space as the cursor
        : FA.inverse(" ");
    }
  }

  // Show placeholder only if value is empty and a placeholder exists
  const showPlaceholder = value.length === 0 && Boolean(placeholder);

  return {
    renderedPlaceholder,
    showPlaceholder
  };
}

module.exports = renderPlaceholderWithCursor;