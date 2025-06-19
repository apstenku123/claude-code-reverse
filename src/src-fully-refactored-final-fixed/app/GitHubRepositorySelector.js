/**
 * Renders a UI component for selecting a GitHub repository, either by using the current repository or entering a different one.
 * Handles keyboard navigation (up/down/enter) to toggle between options and submit the selection.
 *
 * @param {Object} props - The component props
 * @param {string} props.currentRepo - The name of the current repository (if available)
 * @param {boolean} props.useCurrentRepo - Whether the current repository is selected
 * @param {string} props.repoUrl - The URL or owner/repo string for a different repository
 * @param {function} props.onRepoUrlChange - Callback for when the repo URL input changes
 * @param {function} props.onSubmit - Callback for when the selection is submitted
 * @param {function} props.onToggleUseCurrentRepo - Callback for toggling between using the current repo and entering a different one
 * @returns {React.ReactElement} The rendered repository selector component
 */
function GitHubRepositorySelector({
  currentRepo,
  useCurrentRepo,
  repoUrl,
  onRepoUrlChange,
  onSubmit,
  onToggleUseCurrentRepo
}) {
  // State for cursor position in the repo URL input
  const [cursorOffset, setCursorOffset] = dG.useState(0);

  // Get theme styles
  const theme = getThemeStylesheet();

  // Get terminal column width
  const terminalColumns = Z4().columns;

  // Keyboard navigation handler
  D0((_, key) => {
    if (key.upArrow) {
      // Select 'use current repository'
      onToggleUseCurrentRepo(true);
    } else if (key.downArrow) {
      // Select 'enter a different repository'
      onToggleUseCurrentRepo(false);
    } else if (key.return) {
      // Submit the current selection
      onSubmit();
    }
  });

  return (
    dG.default.createElement(
      dG.default.Fragment,
      null,
      // Main container
      dG.default.createElement(
        g,
        {
          flexDirection: "column",
          borderStyle: "round",
          borderColor: theme.secondaryBorder,
          paddingX: 1
        },
        // Title and subtitle
        dG.default.createElement(
          g,
          { flexDirection: "column", marginBottom: 1 },
          dG.default.createElement(_, { bold: true }, "Install GitHub App"),
          dG.default.createElement(_, { dimColor: true }, "Select GitHub repository")
        ),
        // Option: Use current repository
        currentRepo &&
          dG.default.createElement(
            g,
            { marginBottom: 1 },
            dG.default.createElement(
              _,
              {
                bold: useCurrentRepo,
                color: useCurrentRepo ? getThemeStylesheet().permission : undefined
              },
              useCurrentRepo ? "> " : "  ",
              "Use current repository: ",
              currentRepo
            )
          ),
        // Option: Enter a different repository
        dG.default.createElement(
          g,
          { marginBottom: 1 },
          dG.default.createElement(
            _,
            {
              bold: !useCurrentRepo || !currentRepo,
              color: !useCurrentRepo || !currentRepo ? getThemeStylesheet().permission : undefined
            },
            !useCurrentRepo || !currentRepo ? "> " : "  ",
            "Enter a different repository"
          )
        ),
        // Input field for different repository (only if not using current repo)
        (!useCurrentRepo || !currentRepo) &&
          dG.default.createElement(
            g,
            { marginBottom: 1 },
            dG.default.createElement(TextInputWithController, {
              value: repoUrl,
              onChange: onRepoUrlChange,
              onSubmit: onSubmit,
              focus: true,
              placeholder: "owner/repo or https://github.com/owner/repo",
              columns: terminalColumns,
              cursorOffset: cursorOffset,
              onChangeCursorOffset: setCursorOffset,
              showCursor: true
            })
          )
      ),
      // Keyboard hint
      dG.default.createElement(
        g,
        { marginLeft: 3 },
        dG.default.createElement(
          _,
          { dimColor: true },
          currentRepo ? "↑/↓ to select · " : "",
          "Enter to continue"
        )
      )
    )
  );
}

module.exports = GitHubRepositorySelector;