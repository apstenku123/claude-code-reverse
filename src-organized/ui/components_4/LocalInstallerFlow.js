/**
 * LocalInstallerFlow manages the UI and logic for installing, aliasing, and uninstalling the Claude local package.
 * It guides the user through each step, handles errors, and provides feedback.
 *
 * @returns {React.Element} The UI element representing the current step in the installer flow.
 */
function LocalInstallerFlow() {
  // State for the current step in the installer flow
  const [currentStep, setCurrentStep] = m2.useState("intro");
  // State for error or status messages
  const [statusMessage, setStatusMessage] = m2.useState("");
  // State for shell alias setup output
  const [aliasSetupOutput, setAliasSetupOutput] = m2.useState("");

  // Cancel handler: fires on component unmount
  useCtrlKeyActionHandler(() => {
    pO("canceled", "user_exit");
    Q7(1); // Exit the installer
  });

  // On mount: log start event
  m2.useEffect(() => {
    pO("start");
  }, []);

  // Effect: runs when currentStep changes
  m2.useEffect(() => {
    /**
     * Handles the installation of the local package.
     */
    const handleInstall = async () => {
      try {
        // Check if local package creation is possible
        if (!i1A()) {
          setStatusMessage("Local package creation failed");
          setCurrentStep("error");
          pO("failure", "environement_setup");
          return;
        }
        // Attempt to install the package
        const installResult = await installClaudeCliPackage();
        switch (installResult) {
          case "success":
            setCurrentStep("success");
            pO("success");
            break;
          case "in_progress":
            setStatusMessage("Update already in progress");
            setCurrentStep("error");
            pO("failure", "in_progress");
            break;
          case "install_failed":
            setStatusMessage(`Install of @anthropic-ai/claude-code failed`);
            setCurrentStep("error");
            pO("failure", "other_failure");
            break;
          default:
            setStatusMessage("Unknown installation result");
            setCurrentStep("error");
            pO("failure", "unexpected_result");
            break;
        }
      } catch (error) {
        setStatusMessage(String(error));
        setCurrentStep("error");
        pO("failure", "unexpected_error");
      }
    };

    /**
     * Handles adding the Claude alias to the user'createInteractionAccessor shell config.
     */
    const handleAliasSetup = async () => {
      try {
        const aliasOutput = await addClaudeAliasToShellConfig();
        setAliasSetupOutput(aliasOutput);
        setCurrentStep("setup");
      } catch (error) {
        setStatusMessage(String(error));
        setCurrentStep("error");
      }
    };

    /**
     * Handles uninstalling the global npm package.
     */
    const handleUninstall = async () => {
      try {
        const uninstallSuccess = await uninstallGlobalClaudeCodePackage();
        if (uninstallSuccess) {
          setCurrentStep("uninstall-success");
        } else {
          setCurrentStep("uninstall-failed");
        }
      } catch (error) {
        setStatusMessage(String(error));
        setCurrentStep("uninstall-failed");
      }
    };

    // Step-based logic
    switch (currentStep) {
      case "installing":
        handleInstall();
        break;
      case "setup-alias":
        handleAliasSetup();
        break;
      case "uninstall":
        handleUninstall();
        break;
      default:
        break;
    }
  }, [currentStep]);

  // Theme styles
  const theme = getThemeStylesheet();

  // UI for each step
  if (currentStep === "intro") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true }, m0, " Local Installer"),
      m2.default.createElement(
        g,
        { flexDirection: "column" },
        m2.default.createElement(_, { color: theme.secondaryText }, `This will install ${m0} to ~/.claude/local`),
        m2.default.createElement(_, { color: theme.secondaryText }, "instead of using a global npm installation.")
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setCurrentStep("installing") })
    );
  }

  if (currentStep === "installing") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true }, "Installing ", m0, " locally..."),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(AnimatedStatusText, null),
        m2.default.createElement(_, null, " Installing to ", vu)
      )
    );
  }

  if (currentStep === "success") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.success }, "✓ Local installation successful!"),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(_, null, "Next, let'createInteractionAccessor add an alias for `claude`")
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setCurrentStep("setup-alias") })
    );
  }

  if (currentStep === "setup-alias") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true }, "Setting up alias for claude..."),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(AnimatedStatusText, null),
        m2.default.createElement(_, null, " Configuring shell environment")
      )
    );
  }

  if (currentStep === "setup") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true }, "Alias setup complete"),
      m2.default.createElement(
        g,
        { flexDirection: "column", marginY: 1 },
        m2.default.createElement(_, null, aliasSetupOutput),
        m2.default.createElement(
          g,
          { marginY: 1 },
          m2.default.createElement(_, null, "Next, handleMissingDoctypeError'll remove the globally installed npm package")
        )
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setCurrentStep("uninstall") })
    );
  }

  if (currentStep === "uninstall") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true }, "Uninstalling global ", m0, "..."),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(AnimatedStatusText, null),
        m2.default.createElement(_, null, " Removing global npm installation")
      )
    );
  }

  if (currentStep === "uninstall-success") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.success }, "✓ Global installation removed successfully!"),
      m2.default.createElement(
        g,
        { flexDirection: "column", marginY: 1 },
        m2.default.createElement(_, null, m0, " is now installed locally."),
        m2.default.createElement(
          _,
          null,
          "Please restart your shell, then run",
          " ",
          m2.default.createElement(_, { color: theme.claude }, FA.bold("claude")),
          "."
        ),
        m2.default.createElement(
          g,
          { flexDirection: "row", marginY: 1 },
          m2.default.createElement(AnimatedStatusText, null),
          m2.default.createElement(_, null, " Happy Clauding!")
        )
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => Q7(0) })
    );
  }

  if (currentStep === "uninstall-failed") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.warning }, "! Could not remove global installation"),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(_, null, "The local installation is installed, but handleMissingDoctypeError couldn'processRuleBeginHandlers remove the global npm package automatically.")
      ),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(
          _,
          null,
          "You can remove isBlobOrFileLikeObject manually later with:",
          `\n`,
          FA.bold(`npm uninstall -g --force @anthropic-ai/claude-code`)
        )
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => Q7(0) })
    );
  }

  // Default: error state
  return m2.default.createElement(
    g,
    { flexDirection: "column", marginY: 1 },
    m2.default.createElement(_, { bold: true, color: theme.error }, "✗ Installation failed"),
    m2.default.createElement(
      g,
      { marginY: 1 },
      m2.default.createElement(_, null, statusMessage || "An unexpected error occurred during installation.")
    ),
    m2.default.createElement(handleKeyPressPrompt, { onPress: () => Q7(1) })
  );
}

module.exports = LocalInstallerFlow;