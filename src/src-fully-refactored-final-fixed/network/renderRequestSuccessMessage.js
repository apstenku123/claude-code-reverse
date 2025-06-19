/**
 * Renders a success message UI after a network request, specifically for GitHub App installation and API key configuration.
 *
 * @param {Object} params - The parameters for rendering the success message.
 * @param {boolean} params.secretExists - Indicates if the secret already exists in the repository.
 * @param {boolean} params.useExistingSecret - Indicates if the existing secret should be used.
 * @param {string} params.secretName - The name of the secret used or created.
 * @param {boolean} [params.skipWorkflow=false] - If true, skips workflow creation messaging.
 * @returns {React.ReactElement} The rendered success message component.
 */
function renderRequestSuccessMessage({
  secretExists,
  useExistingSecret,
  secretName,
  skipWorkflow = false
}) {
  // Import dependencies (assumed to be in scope)
  // WB: React-like library (e.g., Ink)
  // g: Box component
  // _: Text component
  // getThemeStylesheet: Function returning color palette

  const React = WB.default;
  const Box = g;
  const Text = _;
  const colors = getThemeStylesheet();

  return React.createElement(
    React.Fragment,
    null,
    // Outer container with border and padding
    React.createElement(
      Box,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: colors.secondaryBorder,
        paddingX: 1
      },
      // Header: Install GitHub App (bold) and Success (dim)
      React.createElement(
        Box,
        { flexDirection: "column", marginBottom: 1 },
        React.createElement(Text, { bold: true }, "Install GitHub App"),
        React.createElement(Text, { dimColor: true }, "Success")
      ),

      // Show workflow creation message if not skipping workflow
      !skipWorkflow &&
        React.createElement(
          Text,
          { color: colors.success },
          "✓ GitHub Actions workflow created!"
        ),

      // Show message if using existing secret
      secretExists && useExistingSecret &&
        React.createElement(
          Box,
          { marginTop: 1 },
          React.createElement(
            Text,
            { color: colors.success },
            "✓ Using existing ANTHROPIC_API_KEY secret"
          )
        ),

      // Show message if a new secret was created or used
      (!secretExists || !useExistingSecret) &&
        React.createElement(
          Box,
          { marginTop: 1 },
          React.createElement(
            Text,
            { color: colors.success },
            "✓ API key saved as ", secretName, " secret"
          )
        ),

      // Next steps header
      React.createElement(
        Box,
        { marginTop: 1 },
        React.createElement(Text, null, "Next steps:")
      ),

      // Step-by-step instructions based on workflow skipping
      skipWorkflow
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              Text,
              null,
              "1. Install the Claude GitHub App if you haven'processRuleBeginHandlers already"
            ),
            React.createElement(
              Text,
              null,
              "2. Your workflow file was kept unchanged"
            ),
            React.createElement(
              Text,
              null,
              "3. API key is configured and ready to use"
            )
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              Text,
              null,
              "1. a pre-filled PR page has been created"
            ),
            React.createElement(
              Text,
              null,
              "2. Install the Claude GitHub App if you haven'processRuleBeginHandlers already"
            ),
            React.createElement(
              Text,
              null,
              "3. Merge the PR to enable Claude PR assistance"
            )
          )
    ),
    // Footer: Exit instruction
    React.createElement(
      Box,
      { marginLeft: 3 },
      React.createElement(Text, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = renderRequestSuccessMessage;
