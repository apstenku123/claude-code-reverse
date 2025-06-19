/**
 * Renders a tip message about using git worktrees for running multiple Claude sessions in parallel.
 * Includes a link to the relevant documentation.
 *
 * @returns {React.ReactElement} a React element containing the tip and documentation link.
 */
function renderGitWorktreeTip() {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent styling
  const themeStylesheet = getThemeStylesheet();

  // Render the tip message with a documentation link, styled appropriately
  return dz1.default.createElement(
    g, // Container component (e.g., a View or Box)
    { flexDirection: "row" },
    dz1.default.createElement(
      _, // Text component
      { color: themeStylesheet.secondaryText },
      "※ Tip: Use git worktrees to run multiple Claude sessions in parallel.",
      " ",
      dz1.default.createElement(
        renderLinkOrText, // Link component
        { url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-worktrees" },
        "Learn more"
      )
    )
  );
}

module.exports = renderGitWorktreeTip;