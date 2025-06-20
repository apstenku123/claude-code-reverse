/**
 * Renders a formatted console message with optional error coloring and verbosity.
 *
 * @param {Object} params - The parameters for rendering the message.
 * @param {string} params.content - The message content to display.
 * @param {boolean} params.verbose - Whether to display the message in verbose mode.
 * @param {boolean} params.isError - Whether the message is an error (applies error color if true).
 * @returns {React.ReactElement} The rendered message element.
 */
function FormattedConsoleMessage({
  content,
  verbose,
  isError
}) {
  // Memoize the formatted message to avoid unnecessary recalculations
  const formattedMessage = Fe0.useMemo(() => {
    // If verbose, show the full message; otherwise, summarize with ellipsis
    const processedContent = We0(content);
    return verbose ? processedContent : truncateLinesWithSummary(processedContent);
  }, [content, verbose]);

  // Determine the color for the message (error color if isError is true)
  const messageColor = isError ? getThemeStylesheet().error : undefined;

  // Render the message inside the ConditionalRowContainer component, with color and reset ANSI codes
  return Jt.createElement(
    ConditionalRowContainer,
    null,
    Jt.createElement(
      _,
      { color: messageColor },
      formattedMessage + "\x1B[0m\x1B(createPropertyAccessor"
    )
  );
}

module.exports = FormattedConsoleMessage;