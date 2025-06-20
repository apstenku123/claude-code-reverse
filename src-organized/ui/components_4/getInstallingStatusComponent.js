/**
 * Renders the UI component for the local installer workflow, managing installation, alias setup, and uninstallation states.
 * Handles all side effects and user interactions for each step of the process.
 *
 * @returns {React.ReactElement} The rendered React element representing the current installation step UI.
 */
function getInstallingStatusComponent() {
  // React state hooks for tracking the current step, error message, and shell alias output
  const [currentStep, setCurrentStep] = m2.useState("intro");
  const [errorMessage, setErrorMessage] = m2.useState("");
  const [shellAliasOutput, setShellAliasOutput] = m2.useState("");

  // Handle graceful shutdown on component unmount
  useCtrlKeyActionHandler(() => {
    pO("canceled", "user_exit");
    Q7(1);
  });

  // Record the start of the installation process
  m2.useEffect(() => {
    pO("start");
  }, []);

  // Effect to handle side effects based on the current step
  m2.useEffect(() => {
    // Handles the installation process
    const handleInstall = async () => {
      try {
        if (!i1A()) {
          setErrorMessage("Local package creation failed");
          setCurrentStep("error");
          pO("failure", "environement_setup");
          return;
        }
        const installResult = await installClaudeCliPackage();
        switch (installResult) {
          case "success":
            setCurrentStep("success");
            pO("success");
            break;
          case "in_progress":
            setErrorMessage("Update already in progress");
            setCurrentStep("error");
            pO("failure", "in_progress");
            break;
          case "install_failed":
            setErrorMessage(`Install of @anthropic-ai/claude-code failed`);
            setCurrentStep("error");
            pO("failure", "other_failure");
            break;
        }
      } catch (installError) {
        setErrorMessage(String(installError));
        setCurrentStep("error");
        pO("failure", "unexpected_error");
      }
    };

    // Handles adding the alias to the user'createInteractionAccessor shell config
    const handleAliasSetup = async () => {
      try {
        const aliasOutput = await addClaudeAliasToShellConfig();
        setShellAliasOutput(aliasOutput);
        setCurrentStep("setup");
      } catch (aliasError) {
        setErrorMessage(String(aliasError));
        setCurrentStep("error");
      }
    };

    // Handles uninstalling the global npm package
    const handleUninstall = async () => {
      try {
        const uninstallSuccess = await uninstallGlobalClaudeCodePackage();
        if (uninstallSuccess) {
          setCurrentStep("uninstall-success");
        } else {
          setCurrentStep("uninstall-failed");
        }
      } catch (uninstallError) {
        setErrorMessage(String(uninstallError));
        setCurrentStep("uninstall-failed");
      }
    };

    // Trigger the appropriate side effect based on the current step
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

  // UI rendering for each step
  if (currentStep === "intro") {
    const theme = getThemeStylesheet();
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
      m2.default.createElement(handleKeyPressPrompt, {
        onPress: () => setCurrentStep("installing")
      })
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
    const theme = getThemeStylesheet();
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.success }, "✓ Local installation successful!"),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(_, null, "Next, let'createInteractionAccessor add an alias for `claude`")
      ),
      m2.default.createElement(handleKeyPressPrompt, {
        onPress: () => setCurrentStep("setup-alias")
      })
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
        m2.default.createElement(_, null, shellAliasOutput),
        m2.default.createElement(
          g,
          { marginY: 1 },
          m2.default.createElement(_, null, "Next, handleMissingDoctypeError'll remove the globally installed npm package")
        )
      ),
      m2.default.createElement(handleKeyPressPrompt, {
        onPress: () => setCurrentStep("uninstall")
      })
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
    const theme = getThemeStylesheet();
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.success }, "✓ Global installation removed successfully!"),
      m2.default.createElement(
        g,
        { flexDirection: "column", marginY: 1 },
        m2.default.createElement(_, null, m0, " is now installed locally."),
        m2.default.createElement(_, null, "Please restart your shell, then run", " ", m2.default.createElement(_, { color: theme.claude }, FA.bold("claude")), "."),
        m2.default.createElement(
          g,
          { flexDirection: "row", marginY: 1 },
          m2.default.createElement(AnimatedStatusText, null),
          m2.default.createElement(_, null, " Happy Clauding!")
        )
      ),
      m2.default.createElement(handleKeyPressPrompt, {
        onPress: () => Q7(0)
      })
    );
  }

  if (currentStep === "uninstall-failed") {
    const theme = getThemeStylesheet();
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
      m2.default.createElement(handleKeyPressPrompt, {
        onPress: () => Q7(0)
      })
    );
  }

  // Default error state rendering
  const theme = getThemeStylesheet();
  return m2.default.createElement(
    g,
    { flexDirection: "column", marginY: 1 },
    m2.default.createElement(_, { bold: true, color: theme.error }, "✗ Installation failed"),
    m2.default.createElement(
      g,
      { marginY: 1 },
      m2.default.createElement(_, null, errorMessage || "An unexpected error occurred during installation.")
    ),
    m2.default.createElement(handleKeyPressPrompt, {
      onPress: () => Q7(1)
    })
  );
}

module.exports = getInstallingStatusComponent;