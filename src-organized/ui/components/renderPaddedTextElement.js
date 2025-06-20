/**
 * Renders a styled React element containing padded text, unless hidden.
 *
 * @param {Object} params - The parameters for rendering the element.
 * @param {number|string} params.textValue - The value to display, will be converted to string and padded.
 * @param {number} params.width - The total width of the output string (used for padding).
 * @param {boolean} params.hidden - If true, the function returns null and renders nothing.
 * @returns {React.ReactElement|null} a styled React element with padded text, or null if hidden.
 */
function renderPaddedTextElement({
  textValue,
  width,
  hidden
}) {
  // If hidden is true, do not render anything
  if (hidden) return null;

  // Import theme stylesheet to get the secondary text color
  const themeStylesheet = getThemeStylesheet();
  const secondaryTextColor = themeStylesheet.secondaryText;

  // Prepare the padded text: pad with spaces if textValue is defined, otherwise use spaces only
  const paddedText =
    textValue !== undefined
      ? textValue.toString().padStart(width)
      : " ".repeat(width);

  // Render the styled React element with the padded text and a trailing space
  return React.createElement(
    StyledTextComponent,
    { color: secondaryTextColor },
    paddedText,
    " "
  );
}

module.exports = renderPaddedTextElement;