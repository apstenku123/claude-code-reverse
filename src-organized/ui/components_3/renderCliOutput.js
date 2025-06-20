/**
 * Renders CLI output based on content and verbosity.
 * Handles image data, standard output, standard error, and empty content cases.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.content - The content object containing CLI output data.
 * @param {string} params.content.stdout - The standard output string.
 * @param {string} params.content.stderr - The standard error string.
 * @param {boolean} params.content.isImage - Flag indicating if the content is image data.
 * @param {string} [params.content.returnCodeInterpretation] - Optional interpretation of the return code.
 * @param {boolean} params.verbose - Flag indicating if verbose output should be rendered.
 * @returns {React.ReactElement} The rendered CLI output as a React element.
 */
function renderCliOutput({
  content,
  verbose
}) {
  // Destructure relevant fields from content
  const {
    stdout,
    stderr,
    isImage,
    returnCodeInterpretation
  } = content;

  // If the content is image data, render a message indicating so
  if (isImage) {
    return LO.default.createElement(ConditionalRowContainer, {
      height: 1
    },
      LO.default.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, "[Image data detected and sent to Claude]")
    );
  }

  // Render standard output and error, or a fallback message if both are empty
  return LO.default.createElement(g, {
    flexDirection: "column"
  },
    // Render stdout if present
    stdout !== "" ? LO.default.createElement(FormattedConsoleOutput, {
      content: stdout,
      verbose: verbose
    }) : null,
    // Render stderr if present
    stderr !== "" ? LO.default.createElement(FormattedConsoleOutput, {
      content: stderr,
      verbose: verbose,
      isError: true
    }) : null,
    // If both stdout and stderr are empty, render a fallback message
    stdout === "" && stderr === "" ? LO.default.createElement(ConditionalRowContainer, {
      height: 1
    },
      LO.default.createElement(_, {
        color: getThemeStylesheet().secondaryText
      }, returnCodeInterpretation || "(No content)")
    ) : null
  );
}

module.exports = renderCliOutput;