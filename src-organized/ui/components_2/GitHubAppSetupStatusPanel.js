/**
 * Renders a status panel for the GitHub App installation and API key setup process.
 * Displays messages based on whether the secret exists, whether an existing secret is used,
 * the name of the secret, and whether the workflow step was skipped.
 *
 * @param {Object} params - The parameters for the status panel.
 * @param {boolean} params.secretExists - Whether the ANTHROPIC_API_KEY secret already exists.
 * @param {boolean} params.useExistingSecret - Whether to use the existing secret.
 * @param {string} params.secretName - The name of the secret used or created.
 * @param {boolean} [params.skipWorkflow=false] - Whether the workflow creation step was skipped.
 * @returns {React.ReactElement} The rendered status panel component.
 */
function GitHubAppSetupStatusPanel({
  secretExists,
  useExistingSecret,
  secretName,
  skipWorkflow = false
}) {
  // Get the current theme'createInteractionAccessor stylesheet for consistent colors
  const theme = getThemeStylesheet();

  return WB.default.createElement(
    WB.default.Fragment,
    null,
    WB.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      // Header: Installation success
      WB.default.createElement(
        g,
        { flexDirection: "column", marginBottom: 1 },
        WB.default.createElement(_, { bold: true }, "Install GitHub App"),
        WB.default.createElement(_, { dimColor: true }, "Success")
      ),
      // Show workflow creation message if not skipped
      !skipWorkflow &&
        WB.default.createElement(
          _,
          { color: theme.success },
          "✓ GitHub Actions workflow created!"
        ),
      // Show message if using existing secret
      secretExists && useExistingSecret &&
        WB.default.createElement(
          g,
          { marginTop: 1 },
          WB.default.createElement(
            _,
            { color: theme.success },
            "✓ Using existing ANTHROPIC_API_KEY secret"
          )
        ),
      // Show message if a new secret was created or used
      (!secretExists || !useExistingSecret) &&
        WB.default.createElement(
          g,
          { marginTop: 1 },
          WB.default.createElement(
            _,
            { color: theme.success },
            "✓ API key saved as ", secretName, " secret"
          )
        ),
      // Next steps header
      WB.default.createElement(
        g,
        { marginTop: 1 },
        WB.default.createElement(_, null, "Next steps:")
      ),
      // Conditional next steps based on workflow skip
      skipWorkflow
        ? WB.default.createElement(
            WB.default.Fragment,
            null,
            WB.default.createElement(
              _,
              null,
              "1. Install the Claude GitHub App if you haven'processRuleBeginHandlers already"
            ),
            WB.default.createElement(
              _,
              null,
              "2. Your workflow file was kept unchanged"
            ),
            WB.default.createElement(
              _,
              null,
              "3. API key is configured and ready to use"
            )
          )
        : WB.default.createElement(
            WB.default.Fragment,
            null,
            WB.default.createElement(
              _,
              null,
              "1. a pre-filled PR page has been created"
            ),
            WB.default.createElement(
              _,
              null,
              "2. Install the Claude GitHub App if you haven'processRuleBeginHandlers already"
            ),
            WB.default.createElement(
              _,
              null,
              "3. Merge the PR to enable Claude PR assistance"
            )
          )
    ),
    // Footer: Exit instruction
    WB.default.createElement(
      g,
      { marginLeft: 3 },
      WB.default.createElement(_, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = GitHubAppSetupStatusPanel;