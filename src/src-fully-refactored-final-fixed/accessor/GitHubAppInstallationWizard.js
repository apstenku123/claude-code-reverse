/**
 * GitHubAppInstallationWizard
 *
 * This React component manages the multi-step installation and setup process for the Claude GitHub App and GitHub Actions workflow. 
 * It checks for required CLI tools, validates repository access, manages secrets, and handles workflow file creation, providing user feedback and error handling throughout.
 *
 * @param {Object} props - The component props
 * @param {Object} props.onDone - Callback invoked when the installation process is completed or cancelled
 * @returns {React.ReactElement} The rendered wizard UI for installing the GitHub App
 */
function GitHubAppInstallationWizard(props) {
  // State for storing the user's existing API key (if any)
  const [existingApiKey] = l7.useState(() => getAnthropicApiKey(false));

  // State for tracking the wizard's progress and form data
  const [wizardState, setWizardState] = l7.useState({
    ...vH5,
    useExistingKey: !!existingApiKey
  });

  // Initialize analytics and side effects
  useCtrlKeyActionHandler();
  l7.default.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_install_github_app_started", {});
  }, []);

  /**
   * Checks for required GitHub CLI tools and authentication, and determines the current repository.
   * Updates wizard state with any warnings or detected repository info.
   */
  const checkGitHubCliAndRepo = l7.useCallback(async () => {
    const warnings = [];
    // Check if GitHub CLI is installed
    try {
      DA1("gh --version", { stdio: "ignore" });
    } catch {
      warnings.push({
        title: "GitHub CLI not found",
        message: "GitHub CLI (gh) does not appear to be installed or accessible.",
        instructions: [
          "Install GitHub CLI from https://cli.github.com/",
          "macOS: brew install gh",
          "Windows: winget install --id GitHub.cli",
          "Linux: See installation instructions at https://github.com/cli/cli#installation"
        ]
      });
    }
    // Check if GitHub CLI is authenticated
    try {
      DA1("gh auth status", { stdio: "ignore" });
    } catch {
      warnings.push({
        title: "GitHub CLI not authenticated",
        message: "GitHub CLI does not appear to be authenticated.",
        instructions: [
          "Run: gh auth login",
          "Follow the prompts to authenticate with GitHub",
          "Or set up authentication using environment variables or other methods"
        ]
      });
    }
    // Check for workflow permissions
    try {
      const authStatus = DA1("gh auth status", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"]
      });
      if (!authStatus.includes("workflow")) {
        warnings.push({
          title: "Missing workflow permissions",
          message: "Your GitHub token might not have workflow permissions.",
          instructions: [
            "Run: gh auth refresh -h github.com -s workflow",
            "Or ensure your authentication method includes workflow scope",
            "This is needed to create GitHub Actions workflows"
          ]
        });
      }
    } catch {}
    // Detect current repository (if inside a git repo)
    let detectedRepoName = "";
    try {
      DA1("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
      const remoteUrlMatch = DA1("git remote get-url origin", { encoding: "utf8" })
        .trim()
        .match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
      if (remoteUrlMatch) {
        detectedRepoName = remoteUrlMatch[1]?.replace(/\.git$/, "") || "";
      }
    } catch {}
    // Update wizard state with warnings and repo info
    setWizardState(prevState => ({
      ...prevState,
      warnings,
      currentRepo: detectedRepoName,
      selectedRepoName: detectedRepoName,
      step: warnings.length > 0 ? "warnings" : "choose-repo"
    }));
  }, []);

  // Run the GitHub CLI check when entering the relevant step
  l7.default.useEffect(() => {
    if (wizardState.step === "check-gh") {
      checkGitHubCliAndRepo();
    }
  }, [wizardState.step, checkGitHubCliAndRepo]);

  /**
   * Opens the GitHub App installation page in the default browser, cross-platform.
   */
  async function openGitHubAppInstallPage() {
    if (process.platform === "darwin") {
      await i0("open", ["https://github.com/apps/claude"]);
    } else if (process.platform === "win32") {
      await i0("cmd.exe", ["/c", "start", "", "https://github.com/apps/claude"]);
    } else {
      await i0("xdg-open", ["https://github.com/apps/claude"]);
    }
  }

  /**
   * Checks if the user has admin access to the given repository.
   * @param {string} repoName - The repository in owner/repo format
   * @returns {Promise<{hasAccess: boolean, error?: string}>}
   */
  async function checkRepoAdminAccess(repoName) {
    try {
      const result = await i0("gh", ["api", `repos/${repoName}`, "--jq", ".permissions.admin"]);
      if (result.code === 0) {
        return { hasAccess: result.stdout.trim() === "true" };
      }
      if (result.stderr.includes("404") || result.stderr.includes("Not Found")) {
        return { hasAccess: false, error: "repository_not_found" };
      }
      return { hasAccess: false };
    } catch {
      return { hasAccess: false };
    }
  }

  /**
   * Checks if the Claude workflow file exists in the repository.
   * @param {string} repoName - The repository in owner/repo format
   * @returns {Promise<boolean>}
   */
  async function checkWorkflowExists(repoName) {
    const result = await i0("gh", ["api", `repos/${repoName}/contents/.github/workflows/claude.yml`, "--jq", ".sha"]);
    return result.code === 0;
  }

  /**
   * Checks if the Anthropic API key secret already exists in the repository.
   */
  async function checkExistingSecret() {
    const result = await i0("gh", [
      "secret", "list", "--app", "actions", "--repo", wizardState.selectedRepoName
    ]);
    if (result.code === 0) {
      // Check if the secret exists in the output
      if (result.stdout.split("\n").some(line => /^ANTHROPIC_API_KEY/.test(line))) {
        setWizardState(prev => ({
          ...prev,
          secretExists: true,
          step: "check-existing-secret"
        }));
      } else {
        setWizardState(prev => ({
          ...prev,
          step: "api-key"
        }));
      }
    } else {
      setWizardState(prev => ({
        ...prev,
        step: "api-key"
      }));
    }
  }

  /**
   * Handles the main flow of the wizard, advancing steps and performing actions as needed.
   */
  const handleWizardSubmit = async () => {
    if (wizardState.step === "warnings") {
      setWizardState(prev => ({ ...prev, step: "install-app" }));
      setTimeout(() => {
        openGitHubAppInstallPage();
      }, 0);
    } else if (wizardState.step === "choose-repo") {
      let repoName = wizardState.useCurrentRepo ? wizardState.currentRepo : wizardState.selectedRepoName;
      if (!repoName.trim()) return;
      const repoWarnings = [];
      // Parse repo URL if needed
      if (repoName.includes("github.com")) {
        const urlMatch = repoName.match(/github\.com[:/]([^/]+\/[^/]+)(\.git)?$/);
        if (!urlMatch) {
          repoWarnings.push({
            title: "Invalid GitHub URL format",
            message: "The repository URL format appears to be invalid.",
            instructions: [
              "Use format: owner/repo or https://github.com/owner/repo",
              "Example: anthropics/claude-cli"
            ]
          });
        } else {
          repoName = urlMatch[1]?.replace(/\.git$/, "") || "";
        }
      }
      if (!repoName.includes("/")) {
        repoWarnings.push({
          title: "Repository format warning",
          message: 'Repository should be in format "owner/repo"',
          instructions: [
            "Use format: owner/repo",
            "Example: anthropics/claude-cli"
          ]
        });
      }
      // Check for admin access
      const repoAccess = await checkRepoAdminAccess(repoName);
      if (repoAccess.error === "repository_not_found") {
        repoWarnings.push({
            title: "Repository not found",
            message: `Repository ${repoName} was not found or you don't have access.`,
            instructions: [
              `Check that the repository name is correct: ${repoName}`,
              "Ensure you have access to this repository",
              'For private repositories, make sure your GitHub token has the "repo" scope',
              "You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow"
            ]
        });
      } else if (!repoAccess.hasAccess) {
        repoWarnings.push({
          title: "Admin permissions required",
          message: `You might need admin permissions on ${repoName} to set up GitHub Actions.`,
          instructions: [
            "Repository admins can install GitHub Apps and set secrets",
            "Ask a repository admin to run this command if setup fails",
            "Alternatively, you can use the manual setup instructions"
          ]
        });
      }
      // Check if workflow file exists
      const workflowExists = await checkWorkflowExists(repoName);
      if (repoWarnings.length > 0) {
        const allWarnings = [...wizardState.warnings, ...repoWarnings];
        setWizardState(prev => ({
          ...prev,
          selectedRepoName: repoName,
          workflowExists,
          warnings: allWarnings,
          step: "warnings"
        }));
      } else {
        setWizardState(prev => ({
          ...prev,
          selectedRepoName: repoName,
          workflowExists,
          step: "install-app"
        }));
        setTimeout(() => {
          openGitHubAppInstallPage();
        }, 0);
      }
    } else if (wizardState.step === "install-app") {
      if (wizardState.workflowExists) {
        setWizardState(prev => ({ ...prev, step: "check-existing-workflow" }));
      } else {
        setWizardState(prev => ({ ...prev, step: "check-existing-secret" }));
        await checkExistingSecret();
      }
    } else if (wizardState.step === "check-existing-workflow") {
      // Wait for user action
      return;
    } else if (wizardState.step === "check-existing-secret") {
      if (wizardState.useExistingSecret) {
        setWizardState(prev => ({
          ...prev,
          step: "creating",
          currentWorkflowInstallStep: 0
        }));
        try {
          await setupGithubActionsWorkflow(
            wizardState.selectedRepoName,
            null,
            wizardState.secretName,
            () => {
              setWizardState(prev => ({
                ...prev,
                currentWorkflowInstallStep: prev.currentWorkflowInstallStep + 1
              }));
            },
            wizardState.workflowAction === "skip",
            {
              useCurrentRepo: wizardState.useCurrentRepo,
              workflowExists: wizardState.workflowExists,
              secretExists: wizardState.secretExists
            }
          );
          setWizardState(prev => ({ ...prev, step: "success" }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to set up GitHub Actions";
          if (errorMessage.includes("workflow file already exists")) {
            logTelemetryEventIfEnabled("tengu_install_github_app_error", { reason: "workflow_file_exists" });
            setWizardState(prev => ({
              ...prev,
              step: "error",
              error: "a Claude workflow file already exists in this repository.",
              errorReason: "Workflow file conflict",
              errorInstructions: [
                "The file .github/workflows/claude.yml already exists",
                "You can either:",
                "  1. Delete the existing file and run this command again",
                "  2. Update the existing file manually using the template from:",
                "     https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"
              ]
            }));
          } else {
            logTelemetryEventIfEnabled("tengu_install_github_app_error", { reason: "setup_github_actions_failed" });
            setWizardState(prev => ({
              ...prev,
              step: "error",
              error: errorMessage,
              errorReason: "GitHub Actions setup failed",
              errorInstructions: [
                "Check that you have the necessary permissions",
                "Ensure your GitHub token has workflow scope: gh auth refresh -h github.com -s workflow",
                "Try the manual setup instructions if this persists"
              ]
            }));
          }
        }
      } else {
        setWizardState(prev => ({ ...prev, step: "api-key" }));
      }
    } else if (wizardState.step === "api-key") {
      const apiKey = wizardState.useExistingKey ? existingApiKey : wizardState.apiKey;
      if (!apiKey) {
        logTelemetryEventIfEnabled("tengu_install_github_app_error", { reason: "api_key_missing" });
        setWizardState(prev => ({
          ...prev,
          step: "error",
          error: "API key is required"
        }));
        return;
      }
      setWizardState(prev => ({
        ...prev,
        apiKey,
        step: "creating",
        currentWorkflowInstallStep: 0
      }));
      try {
        await setupGithubActionsWorkflow(
          wizardState.selectedRepoName,
          apiKey,
          wizardState.secretName,
          () => {
            setWizardState(prev => ({
              ...prev,
              currentWorkflowInstallStep: prev.currentWorkflowInstallStep + 1
            }));
          },
          wizardState.workflowAction === "skip",
          {
            useCurrentRepo: wizardState.useCurrentRepo,
            workflowExists: wizardState.workflowExists,
            secretExists: wizardState.secretExists
          }
        );
        setWizardState(prev => ({ ...prev, step: "success" }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to set up GitHub Actions";
        if (errorMessage.includes("workflow file already exists")) {
          logTelemetryEventIfEnabled("tengu_install_github_app_error", { reason: "workflow_file_exists" });
          setWizardState(prev => ({
            ...prev,
            step: "error",
            error: "a Claude workflow file already exists in this repository.",
            errorReason: "Workflow file conflict",
            errorInstructions: [
              "The file .github/workflows/claude.yml already exists",
              "You can either:",
              "  1. Delete the existing file and run this command again",
              "  2. Update the existing file manually using the template from:",
              "     https://github.com/anthropics/claude-code-action/#manual-setup-direct-api"
            ]
          }));
        } else {
          logTelemetryEventIfEnabled("tengu_install_github_app_error", { reason: "setup_github_actions_failed" });
          setWizardState(prev => ({
            ...prev,
            step: "error",
            error: errorMessage,
            errorReason: "GitHub Actions setup failed",
            errorInstructions: [
              "Check that you have the necessary permissions",
                "Ensure your GitHub token has workflow scope: gh auth refresh -h github.com -s workflow",
              "Try the manual setup instructions if this persists"
            ]
          }));
        }
      }
    }
  };

  // Handlers for form fields and toggles
  const handleRepoUrlChange = repoUrl => {
    setWizardState(prev => ({ ...prev, selectedRepoName: repoUrl }));
  };
  const handleApiKeyChange = apiKey => {
    setWizardState(prev => ({ ...prev, apiKey }));
  };
  const handleSecretNameChange = secretName => {
    if (secretName && !/^[A-Z0-9_]+$/.test(secretName)) return;
    setWizardState(prev => ({ ...prev, secretName }));
  };
  const handleUseCurrentRepoToggle = useCurrentRepo => {
    setWizardState(prev => ({
      ...prev,
      useCurrentRepo,
      selectedRepoName: useCurrentRepo ? prev.currentRepo : ""
    }));
  };
  const handleUseExistingKeyToggle = useExistingKey => {
    setWizardState(prev => ({ ...prev, useExistingKey }));
  };
  const handleUseExistingSecretToggle = useExistingSecret => {
    setWizardState(prev => ({
      ...prev,
      useExistingSecret,
      secretName: useExistingSecret ? "ANTHROPIC_API_KEY" : ""
    }));
  };
  /**
   * Handles user selection of workflow action (skip/update/exit) when workflow file already exists.
   * @param {string} action - The selected workflow action
   */
  const handleWorkflowActionSelect = async action => {
    if (action === "exit") {
      props.onDone("Installation cancelled by user");
      return;
    }
    setWizardState(prev => ({ ...prev, workflowAction: action }));
    if (action === "skip" || action === "update") {
      setWizardState(prev => ({ ...prev, step: "check-existing-secret" }));
      await checkExistingSecret();
    }
  };

  // Final effect: when wizard completes, call onDone
  D0(() => {
    if (wizardState.step === "success" || wizardState.step === "error") {
      if (wizardState.step === "success") {
        logTelemetryEventIfEnabled("tengu_install_github_app_completed", {});
      }
      props.onDone(
        wizardState.step === "success"
          ? "GitHub Actions setup complete!"
          : wizardState.error
            ? `Couldn't install GitHub App: ${wizardState.error}\nFor manual setup instructions, see: https://github.com/anthropics/claude-code-action/#manual-setup-direct-api`
            : `GitHub App installation failed\nFor manual setup instructions, see: https://github.com/anthropics/claude-code-action/#manual-setup-direct-api`
      );
    }
  }, wizardState.step);

  // Render the appropriate step UI
  switch (wizardState.step) {
    case "check-gh":
      return l7.default.createElement(RT2, null);
    case "warnings":
      return l7.default.createElement(SetupWarningsPanel, {
        warnings: wizardState.warnings,
        onContinue: handleWizardSubmit
      });
    case "choose-repo":
      return l7.default.createElement(GitHubRepositorySelector, {
        currentRepo: wizardState.currentRepo,
        useCurrentRepo: wizardState.useCurrentRepo,
        repoUrl: wizardState.selectedRepoName,
        onRepoUrlChange: handleRepoUrlChange,
        onToggleUseCurrentRepo: handleUseCurrentRepoToggle,
        onSubmit: handleWizardSubmit
      });
    case "install-app":
      return l7.default.createElement(GitHubAppInstallPrompt, {
        repoUrl: wizardState.selectedRepoName,
        onSubmit: handleWizardSubmit
      });
    case "check-existing-workflow":
      return l7.default.createElement(WorkflowUpdateOptionsPrompt, {
        repoName: wizardState.selectedRepoName,
        onSelectAction: handleWorkflowActionSelect
      });
    case "check-existing-secret":
      return l7.default.createElement(ApiKeySecretSelectionPrompt, {
        useExistingSecret: wizardState.useExistingSecret,
        secretName: wizardState.secretName,
        onToggleUseExistingSecret: handleUseExistingSecretToggle,
        onSecretNameChange: handleSecretNameChange,
        onSubmit: handleWizardSubmit
      });
    case "api-key":
      return l7.default.createElement(ApiKeyInputPanel, {
        existingApiKey,
        useExistingKey: wizardState.useExistingKey,
        apiKey: wizardState.apiKey,
        onApiKeyChange: handleApiKeyChange,
        onToggleUseExistingKey: handleUseExistingKeyToggle,
        onSubmit: handleWizardSubmit
      });
    case "creating":
      return l7.default.createElement(renderWorkflowInstallSteps, {
        currentWorkflowInstallStep: wizardState.currentWorkflowInstallStep,
        secretExists: wizardState.secretExists,
        useExistingSecret: wizardState.useExistingSecret,
        secretName: wizardState.secretName,
        skipWorkflow: wizardState.workflowAction === "skip"
      });
    case "success":
      return l7.default.createElement(renderGitHubAppSetupStatus, {
        secretExists: wizardState.secretExists,
        useExistingSecret: wizardState.useExistingSecret,
        secretName: wizardState.secretName,
        skipWorkflow: wizardState.workflowAction === "skip"
      });
    case "error":
      return l7.default.createElement(GitHubAppErrorDisplay, {
        error: wizardState.error,
        errorReason: wizardState.errorReason,
        errorInstructions: wizardState.errorInstructions
      });
    default:
      return null;
  }
}

module.exports = GitHubAppInstallationWizard;
