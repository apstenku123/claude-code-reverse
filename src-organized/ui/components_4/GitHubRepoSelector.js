/**
 * Renders a UI component for selecting a GitHub repository, allowing the user to choose between the current repository or entering a different one.
 * Handles keyboard navigation (up/down/enter) and manages input focus and cursor position.
 *
 * @param {Object} props - The component props
 * @param {string} props.currentRepo - The name of the current repository (e.g., 'owner/repo')
 * @param {boolean} props.useCurrentRepo - Whether the current repository is selected
 * @param {string} props.repoUrl - The value of the repository URL input field
 * @param {function} props.onRepoUrlChange - Callback when the repository URL input changes
 * @param {function} props.onSubmit - Callback when the user submits the selection
 * @param {function} props.onToggleUseCurrentRepo - Callback to toggle between using the current repo and entering a different one
 * @returns {React.ReactElement} The rendered repository selector UI
 */
function GitHubRepoSelector({
  currentRepo,
  useCurrentRepo,
  repoUrl,
  onRepoUrlChange,
  onSubmit,
  onToggleUseCurrentRepo
}) {
  // State for the cursor offset in the repo input field
  const [cursorOffset, setCursorOffset] = dG.useState(0);

  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get terminal window size (columns)
  const { columns: terminalColumns } = Z4();

  // Keyboard event handler for up/down/enter keys
  D0((_, key) => {
    if (key.upArrow) {
      onToggleUseCurrentRepo(true);
    } else if (key.downArrow) {
      onToggleUseCurrentRepo(false);
    } else if (key.return) {
      onSubmit();
    }
  });

  return dG.default.createElement(
    dG.default.Fragment,
    null,
    // Main container with border and padding
    dG.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      // Header section
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
              color: useCurrentRepo ? theme.permission : undefined
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
            color: !useCurrentRepo || !currentRepo ? theme.permission : undefined
          },
          !useCurrentRepo || !currentRepo ? "> " : "  ",
          "Enter a different repository"
        )
      ),
      // Input field for entering a different repository (only shown if not using current repo)
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
    // Footer with keyboard hints
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
  );
}

module.exports = GitHubRepoSelector;