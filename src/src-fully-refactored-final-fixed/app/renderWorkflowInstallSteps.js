/**
 * Renders the step-by-step UI for installing a GitHub Actions workflow, including status indicators for each step.
 *
 * @param {Object} params - The parameters for rendering the workflow steps.
 * @param {number} params.currentWorkflowInstallStep - The index of the current step in the workflow installation process.
 * @param {boolean} params.secretExists - Whether the API key secret already exists.
 * @param {boolean} params.useExistingSecret - Whether to use the existing API key secret.
 * @param {string} params.secretName - The name of the secret being set up.
 * @param {boolean} [params.skipWorkflow=false] - Whether to skip the workflow creation steps.
 * @returns {React.ReactElement} The rendered React element representing the workflow installation steps UI.
 */
function renderWorkflowInstallSteps({
  currentWorkflowInstallStep,
  secretExists,
  useExistingSecret,
  secretName,
  skipWorkflow = false
}) {
  // Get the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();

  // Define the steps to display, depending on whether workflow steps are skipped
  const steps = skipWorkflow
    ? [
        "Getting repository information",
        secretExists && useExistingSecret
          ? "Using existing API key secret"
          : `Setting up ${secretName} secret`
      ]
    : [
        "Getting repository information",
        "Creating branch",
        "Creating workflow file",
        secretExists && useExistingSecret
          ? "Using existing API key secret"
          : `Setting up ${secretName} secret`,
        "Opening pull request page"
      ];

  // Render the steps with their respective status indicators
  return createDebouncedFunction$.default.createElement(
    createDebouncedFunction$.default.Fragment,
    null,
    createDebouncedFunction$.default.createElement(
      g,
      {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: theme.secondaryBorder,
        paddingX: 1
      },
      createDebouncedFunction$.default.createElement(
        g,
        {
          flexDirection: "column",
          marginBottom: 1
        },
        createDebouncedFunction$.default.createElement(_, { bold: true }, "Install GitHub App"),
        createDebouncedFunction$.default.createElement(_, { dimColor: true }, "Create GitHub Actions workflow")
      ),
      steps.map((stepLabel, stepIndex) => {
        // Determine the status of each step
        let stepStatus = "pending";
        if (stepIndex < currentWorkflowInstallStep) {
          stepStatus = "completed";
        } else if (stepIndex === currentWorkflowInstallStep) {
          stepStatus = "in-progress";
        }

        // Choose the color based on the status
        let color;
        if (stepStatus === "completed") {
          color = theme.success;
        } else if (stepStatus === "in-progress") {
          color = theme.warning;
        }

        return createDebouncedFunction$.default.createElement(
          g,
          { key: stepIndex },
          createDebouncedFunction$.default.createElement(
            _,
            { color },
            stepStatus === "completed" ? "✓ " : "",
            stepLabel,
            stepStatus === "in-progress" ? "…" : ""
          )
        );
      })
    )
  );
}

module.exports = renderWorkflowInstallSteps;