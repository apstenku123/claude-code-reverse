/**
 * Renders a prompt UI when an existing Claude workflow file is found in a repository.
 * Allows the user to choose to update the workflow, skip updating, or exit without changes.
 *
 * @param {Object} params - The parameters for the prompt.
 * @param {string} params.repoName - The name of the repository where the workflow was found.
 * @param {function} params.onSelectAction - Callback invoked with the user'createInteractionAccessor selected action ('update', 'skip', or 'exit').
 * @returns {React.Element} The rendered prompt component.
 */
function renderExistingWorkflowPrompt({
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
   * Handles when the user selects an option.
   * @param {string} selectedValue - The value of the selected option.
   */
  const handleOptionSelect = (selectedValue) => {
    onSelectAction(selectedValue);
  };

  /**
   * Handles when the user cancels the prompt (exits).
   */
  const handleCancel = () => {
    onSelectAction("exit");
  };

  // Render the prompt UI using Ink components
  return $W.default.createElement(g, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: getThemeStylesheet().secondaryBorder,
    paddingX: 1
  },
    // Header section
    $W.default.createElement(g, {
      flexDirection: "column",
      marginBottom: 1
    },
      $W.default.createElement(_, {
        bold: true
      }, "Existing Workflow Found"),
      $W.default.createElement(_, {
        dimColor: true
      }, "Repository: ", repoName)
    ),
    // Info section
    $W.default.createElement(g, {
      flexDirection: "column",
      marginBottom: 1
    },
      $W.default.createElement(_, null, "a Claude workflow file already exists at", " ",
        $W.default.createElement(_, {
          color: "cyan"
        }, ".github/workflows/claude.yml")
      ),
      $W.default.createElement(_, {
        dimColor: true
      }, "What would you like to do?")
    ),
    // Options selector
    $W.default.createElement(g, {
      flexDirection: "column"
    },
      $W.default.createElement(SelectableOptionsList, {
        options: workflowOptions,
        onChange: handleOptionSelect,
        onCancel: handleCancel
      })
    ),
    // Footer with link to latest workflow template
    $W.default.createElement(g, {
      marginTop: 1
    },
      $W.default.createElement(_, {
        dimColor: true
      }, "View the latest workflow template at:", " ",
        $W.default.createElement(_, {
          color: "cyan"
        }, "https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml")
      )
    )
  );
}

module.exports = renderExistingWorkflowPrompt;