/**
 * Renders formatted console output, optionally truncating and styling error messages.
 *
 * @param {Object} params - The parameters for rendering output.
 * @param {string} params.content - The text content to display in the console.
 * @param {boolean} params.verbose - Whether to display the full content (true) or truncate (false).
 * @param {boolean} params.isError - Whether the output represents an error (applies error color if true).
 * @returns {React.ReactElement} The formatted console output as a React element.
 */
function FormattedConsoleOutput({
  content,
  verbose,
  isError
}) {
  // Memoize the formatted output to avoid unnecessary recalculations
  const formattedOutput = Fe0.useMemo(() => {
    // Always process content through We0 (possibly for formatting/escaping)
    const processedContent = We0(content);
    // If verbose, show full content; otherwise, truncate with summary
    return verbose ? processedContent : truncateLinesWithSummary(processedContent);
  }, [content, verbose]);

  // Determine the color for the output (error color if isError is true)
  const outputColor = isError ? getThemeStylesheet().error : undefined;

  // Render the output inside the ConditionalRowContainer component, with color and reset codes
  return Jt.createElement(
    ConditionalRowContainer,
    null,
    Jt.createElement(
      _,
      { color: outputColor },
      formattedOutput + "\x1B[0m\x1B(createPropertyAccessor" // Append ANSI reset codes
    )
  );
}

module.exports = FormattedConsoleOutput;