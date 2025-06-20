/**
 * Renders a detailed error message UI for GitHub App installation failures.
 * Displays the error, optional reason, and optional instructions for fixing the issue.
 *
 * @param {Object} params - The error details and instructions.
 * @param {string} params.error - The main error message to display.
 * @param {string} [params.errorReason] - An optional, more specific reason for the error.
 * @param {string[]} [params.errorInstructions] - Optional instructions on how to fix the error.
 * @returns {React.ReactElement} The rendered error message UI.
 */
function GitHubAppInstallErrorMessage({
  error,
  errorReason,
  errorInstructions
}) {
  // Get the current theme'createInteractionAccessor stylesheet
  const theme = getThemeStylesheet();

  return V7.default.createElement(
    V7.default.Fragment,
    null,
    V7.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      // Header section
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
        { color: theme.error },
        "Error: ",
        error
      ),
      // Optional error reason
      errorReason &&
        V7.default.createElement(
          g,
          { marginTop: 1 },
          V7.default.createElement(
            _,
            { dimColor: true },
            "Reason: ",
            errorReason
          )
        ),
      // Optional instructions on how to fix
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
    // Footer: exit prompt
    V7.default.createElement(
      g,
      { marginLeft: 3 },
      V7.default.createElement(_, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = GitHubAppInstallErrorMessage;