/**
 * Renders a formatted error message based on the result string and verbosity flag.
 * Displays a trimmed error, handles input validation errors, and supports verbose/non-verbose modes.
 *
 * @param {Object} params - The parameters for rendering the error message.
 * @param {string} params.result - The error result string to display.
 * @param {boolean} params.verbose - Whether to show the full error message (verbose mode).
 * @returns {React.ReactElement} The rendered error message component.
 */
function renderErrorMessage({ result, verbose }) {
  // If result is not a string, show generic error
  let errorMessage;
  if (typeof result !== "string") {
    errorMessage = "Error";
  } else {
    const trimmedResult = result.trim();
    // If not verbose and error is an input validation error, show a friendly message
    if (!verbose && trimmedResult.includes("InputValidationError: ")) {
      errorMessage = "Invalid tool parameters";
    } else if (trimmedResult.startsWith("Error: ")) {
      // If already starts with 'Error: ', use as is
      errorMessage = trimmedResult;
    } else {
      // Otherwise, prepend 'Error: '
      errorMessage = `Error: ${trimmedResult}`;
    }
  }

  // Calculate the number of lines exceeding the preview limit
  const errorLines = errorMessage.split(`\n`).length;
  const previewLineLimit = Pp1; // Pp1 is assumed to be a constant for preview line count
  const hiddenLineCount = errorLines - previewLineLimit;

  // Render the error message using React elements
  return kN.createElement(
    ConditionalRowContainer,
    null,
    kN.createElement(
      g,
      { flexDirection: "column" },
      kN.createElement(
        _,
        { color: getThemeStylesheet().error },
        verbose
          ? errorMessage
          : errorMessage.split(`\n`).slice(0, previewLineLimit).join(`\n`) || ""
      ),
      // If not verbose and there are hidden lines, show the 'see all' hint
      !verbose && errorLines > previewLineLimit &&
        kN.createElement(
          _,
          { color: getThemeStylesheet().secondaryText },
          "… +",
          hiddenLineCount,
          " ",
          hiddenLineCount === 1 ? "line" : "lines",
          " (",
          FA.bold("ctrl+r"),
          " to see all)"
        )
    )
  );
}

module.exports = renderErrorMessage;