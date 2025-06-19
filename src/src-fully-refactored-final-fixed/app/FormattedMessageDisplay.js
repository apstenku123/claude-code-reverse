/**
 * Renders a formatted message, applying error coloring and formatting based on verbosity and error state.
 *
 * @param {Object} params - The parameters for the message display.
 * @param {string} params.content - The message content to display.
 * @param {boolean} params.verbose - Whether to display the message in verbose mode.
 * @param {boolean} params.isError - Whether the message represents an error.
 * @returns {React.ReactElement} The formatted message React element.
 */
function FormattedMessageDisplay({
  content,
  verbose,
  isError
}) {
  // Memoize the formatted message to avoid unnecessary recalculations
  const formattedMessage = Fe0.useMemo(() => {
    // If verbose, return the processed content directly
    if (verbose) {
      return We0(content);
    } else {
      // Otherwise, further process the content (e.g., strip formatting)
      return truncateLinesWithSummary(We0(content));
    }
  }, [content, verbose]);

  // Determine the color for the message (error color if isError is true)
  const messageColor = isError ? getThemeStylesheet().error : undefined;

  // Return the formatted message wrapped in the appropriate React elements
  return Jt.createElement(
    ConditionalRowContainer,
    null,
    Jt.createElement(
      _,
      { color: messageColor },
      formattedMessage + "\x1B[0m\x1B(createPropertyAccessor" // Append ANSI reset codes
    )
  );
}

module.exports = FormattedMessageDisplay;