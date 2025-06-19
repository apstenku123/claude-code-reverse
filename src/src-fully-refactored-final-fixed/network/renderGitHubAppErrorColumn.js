/**
 * Renders a styled error message column for GitHub App installation errors.
 * Displays the main error, an optional reason, optional instructions to fix,
 * and a link to manual setup instructions. Also prompts the user to exit.
 *
 * @param {Object} params - The error display parameters.
 * @param {string} params.error - The main error message to display.
 * @param {string} [params.errorReason] - Optional reason for the error.
 * @param {string[]} [params.errorInstructions] - Optional array of instructions for fixing the error.
 * @returns {React.ReactElement} The rendered error column React element.
 */
function renderGitHubAppErrorColumn({
  error,
  errorReason,
  errorInstructions
}) {
  // Import dependencies (assumed to be in scope)
  // V7: React (aliased), g: Box component, _: Text component, getThemeStylesheet: getThemeStylesheet
  const React = V7.default;
  const Box = g;
  const Text = _;
  const theme = getThemeStylesheet();

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Box,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      // Header: Title and Error label
      React.createElement(
        Box,
        { flexDirection: "column", marginBottom: 1 },
        React.createElement(Text, { bold: true }, "Install GitHub App"),
        React.createElement(Text, { dimColor: true }, "Error")
      ),
      // Main error message
      React.createElement(
        Text,
        { color: theme.error },
        "Error: ", error
      ),
      // Optional error reason
      errorReason &&
        React.createElement(
          Box,
          { marginTop: 1 },
          React.createElement(
            Text,
            { dimColor: true },
            "Reason: ", errorReason
          )
        ),
      // Optional error instructions (list)
      errorInstructions &&
        errorInstructions.length > 0 &&
        React.createElement(
          Box,
          { flexDirection: "column", marginTop: 1 },
          React.createElement(Text, { dimColor: true }, "How to fix:"),
          errorInstructions.map((instruction, index) =>
            React.createElement(
              Box,
              { key: index, marginLeft: 2 },
              React.createElement(Text, { dimColor: true }, "• "),
              React.createElement(Text, null, instruction)
            )
          )
        ),
      // Manual setup instructions link
      React.createElement(
        Box,
        { marginTop: 1 },
        React.createElement(
          Text,
          { dimColor: true },
          "For manual setup instructions, see:",
          " ",
          React.createElement(
            Text,
            { color: "cyan" },
            "https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"
          )
        )
      )
    ),
    // Prompt to exit
    React.createElement(
      Box,
      { marginLeft: 3 },
      React.createElement(Text, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = renderGitHubAppErrorColumn;