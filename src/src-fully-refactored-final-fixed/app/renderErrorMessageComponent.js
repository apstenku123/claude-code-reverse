/**
 * Renders a styled error message component based on the result string and verbosity flag.
 * Handles different error formats, trims input, and supports verbose/non-verbose display.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.result - The error result string to display.
 * @param {boolean} params.verbose - Whether to show the full error message (verbose mode).
 * @returns {React.ReactElement} The rendered error message React component.
 */
function renderErrorMessageComponent({ result, verbose }) {
  // Determine the error message to display
  let errorMessage;
  if (typeof result !== "string") {
    errorMessage = "Error";
  } else {
    const trimmedResult = result.trim();
    // If not verbose and the error is an input validation error, show a friendly message
    if (!verbose && trimmedResult.includes("InputValidationError: ")) {
      errorMessage = "Invalid tool parameters";
    } else if (trimmedResult.startsWith("Error: ")) {
      // If the error already starts with 'Error: ', use as is
      errorMessage = trimmedResult;
    } else {
      // Otherwise, prepend 'Error: '
      errorMessage = `Error: ${trimmedResult}`;
    }
  }

  // Calculate the number of hidden lines if not verbose
  const errorLines = errorMessage.split(`\n`).length;
  const hiddenLineCount = errorLines - Pp1;

  // Render the error message component
  return kN.createElement(
    ConditionalRowContainer,
    null,
    kN.createElement(
      g,
      { flexDirection: "column" },
      // Main error message (truncated if not verbose)
      kN.createElement(
        _,
        { color: getThemeStylesheet().error },
        verbose
          ? errorMessage
          : errorMessage.split(`\n`).slice(0, Pp1).join(`\n`) || ""
      ),
      // If not verbose and there are hidden lines, show the 'see all' hint
      !verbose && errorLines > Pp1 &&
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

module.exports = renderErrorMessageComponent;