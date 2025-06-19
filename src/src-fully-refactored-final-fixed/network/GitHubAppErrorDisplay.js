/**
 * Renders a detailed error message UI for GitHub App installation failures.
 * Displays the error, reason, possible instructions to fix, and a manual setup link.
 *
 * @param {Object} params - The error display parameters.
 * @param {string} params.error - The main error message to display.
 * @param {string} [params.errorReason] - An optional, more detailed reason for the error.
 * @param {string[]} [params.errorInstructions] - Optional instructions for resolving the error.
 * @returns {React.ReactElement} The rendered error UI component.
 */
function GitHubAppErrorDisplay({
  error,
  errorReason,
  errorInstructions
}) {
  // Import theme styles for consistent coloring
  const themeStyles = getThemeStylesheet();

  return V7.default.createElement(
    V7.default.Fragment,
    null,
    // Main error container with border and padding
    V7.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: themeStyles.secondaryBorder,
        paddingX: 1
      },
      // Header section: Title and error label
      V7.default.createElement(
        g,
        {
          flexDirection: "column",
          marginBottom: 1
        },
        V7.default.createElement(_, { bold: true }, "Install GitHub App"),
        V7.default.createElement(_, { dimColor: true }, "Error")
      ),
      // Main error message
      V7.default.createElement(
        _,
        { color: themeStyles.error },
        "Error: ", error
      ),
      // Optional error reason if provided
      errorReason &&
        V7.default.createElement(
          g,
          { marginTop: 1 },
          V7.default.createElement(
            _,
            { dimColor: true },
            "Reason: ", errorReason
          )
        ),
      // Optional error instructions if provided and not empty
      errorInstructions &&
        errorInstructions.length > 0 &&
        V7.default.createElement(
          g,
          { flexDirection: "column", marginTop: 1 },
          V7.default.createElement(_, { dimColor: true }, "How to fix:"),
          errorInstructions.map((instruction, index) =>
            V7.default.createElement(
              g,
              { key: index, marginLeft: 2 },
              V7.default.createElement(_, { dimColor: true }, "• "),
              V7.default.createElement(_, null, instruction)
            )
          )
        ),
      // Manual setup instructions link
      V7.default.createElement(
        g,
        { marginTop: 1 },
        V7.default.createElement(
          _,
          { dimColor: true },
          "For manual setup instructions, see:",
          " ",
          V7.default.createElement(
            _,
            { color: "cyan" },
            "https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"
          )
        )
      )
    ),
    // Footer: prompt to exit
    V7.default.createElement(
      g,
      { marginLeft: 3 },
      V7.default.createElement(_, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = GitHubAppErrorDisplay;