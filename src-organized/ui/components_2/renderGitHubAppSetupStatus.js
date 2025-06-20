/**
 * Renders the status and next steps for setting up the GitHub App and API key secret.
 *
 * @param {Object} options - The options for rendering the setup status.
 * @param {boolean} options.secretExists - Whether the ANTHROPIC_API_KEY secret already exists.
 * @param {boolean} options.useExistingSecret - Whether to use the existing secret.
 * @param {string} options.secretName - The name of the secret being used or created.
 * @param {boolean} [options.skipWorkflow=false] - Whether the workflow file was skipped (not created/modified).
 * @returns {React.ReactElement} The rendered status and instructions for the user.
 */
function renderGitHubAppSetupStatus({
  secretExists,
  useExistingSecret,
  secretName,
  skipWorkflow = false
}) {
  // Get the current theme stylesheet
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
      // Header: Install GitHub App (bold) and Success (dim)
      WB.default.createElement(
        g,
        {
          flexDirection: "column",
          marginBottom: 1
        },
        WB.default.createElement(_, { bold: true }, "Install GitHub App"),
        WB.default.createElement(_, { dimColor: true }, "Success")
      ),
      // Show workflow creation success if workflow was not skipped
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
      // Show message if a new secret was saved
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
      // Show different next steps depending on whether workflow was skipped
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
    // Footer: Exit prompt
    WB.default.createElement(
      g,
      { marginLeft: 3 },
      WB.default.createElement(_, { dimColor: true }, "Press any key to exit")
    )
  );
}

module.exports = renderGitHubAppSetupStatus;