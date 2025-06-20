/**
 * Renders a UI component presenting options when an existing Claude workflow file is found in a repository.
 *
 * @param {Object} params - The parameters for rendering the options.
 * @param {string} params.repoName - The name of the repository where the workflow file exists.
 * @param {function} params.onSelectAction - Callback function invoked when the user selects an action or cancels.
 * @returns {React.Element} The rendered React element containing the options UI.
 */
function renderExistingWorkflowOptions({
  repoName,
  onSelectAction
}) {
  // Options presented to the user
  const workflowOptions = [
    {
      label: "Update workflow file with latest version",
      value: "update"
    },
    {
      label: "Skip workflow update (configure secrets only)",
      value: "skip"
    },
    {
      label: "Exit without making changes",
      value: "exit"
    }
  ];

  /**
   * Handles the selection of an option from the list.
   * @param {string} selectedValue - The value of the selected option.
   */
  const handleOptionSelect = (selectedValue) => {
    onSelectAction(selectedValue);
  };

  /**
   * Handles the cancel action (e.g., user presses Escape or cancels selection).
   */
  const handleCancel = () => {
    onSelectAction("exit");
  };

  // Retrieve theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet().secondaryBorder;

  // Render the options UI using React elements
  return $W.default.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: themeStyles,
      paddingX: 1
    },
    // Header section: Title and repository name
    $W.default.createElement(
      g,
      { flexDirection: "column", marginBottom: 1 },
      $W.default.createElement(_, { bold: true }, "Existing Workflow Found"),
      $W.default.createElement(_, { dimColor: true }, "Repository: ", repoName)
    ),
    // Info section: File location and prompt
    $W.default.createElement(
      g,
      { flexDirection: "column", marginBottom: 1 },
      $W.default.createElement(
        _,
        null,
        "a Claude workflow file already exists at ",
        $W.default.createElement(_, { color: "cyan" }, ".github/workflows/claude.yml")
      ),
      $W.default.createElement(_, { dimColor: true }, "What would you like to do?")
    ),
    // Options list section
    $W.default.createElement(
      g,
      { flexDirection: "column" },
      $W.default.createElement(SelectableOptionsList, {
        options: workflowOptions,
        onChange: handleOptionSelect,
        onCancel: handleCancel
      })
    ),
    // Footer section: Link to latest workflow template
    $W.default.createElement(
      g,
      { marginTop: 1 },
      $W.default.createElement(
        _,
        { dimColor: true },
        "View the latest workflow template at: ",
        $W.default.createElement(_, { color: "cyan" }, "https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml")
      )
    )
  );
}

module.exports = renderExistingWorkflowOptions;