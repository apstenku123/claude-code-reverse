/**
 * Renders a detailed error panel for GitHub App installation issues.
 * Displays the error message, optional reason, and optional instructions for resolution.
 * Also provides a link for manual setup instructions and an exit prompt.
 *
 * @param {Object} params - The error panel parameters.
 * @param {string} params.error - The main error message to display.
 * @param {string} [params.errorReason] - Optional reason for the error.
 * @param {string[]} [params.errorInstructions] - Optional list of instructions to resolve the error.
 * @returns {React.ReactElement} The rendered error panel React element.
 */
function renderGitHubAppErrorPanel({
  error,
  errorReason,
  errorInstructions
}) {
  // Get themed styles for borders and error color
  const themeStyles = getThemeStylesheet();

  return V7.default.createElement(
    V7.default.Fragment,
    null,
    // Main error panel container
    V7.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: themeStyles.secondaryBorder,
        paddingX: 1
      },
      // Header section: Title and 'Error' label
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
      // Optional error reason
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
      // Optional error instructions (list)
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
    // Exit prompt
    V7.default.createElement(
      g,
      { marginLeft: 3 },
      V7.default.createElement(_, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = renderGitHubAppErrorPanel;