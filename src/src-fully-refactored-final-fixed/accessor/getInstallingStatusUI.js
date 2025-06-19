/**
 * Renders the UI for the local installer process, handling installation, alias setup, and uninstallation steps.
 * Manages state transitions, error handling, and user interactions throughout the installation flow.
 *
 * @returns {React.ReactElement} The React element representing the current step of the installation UI.
 */
function getInstallingStatusUI() {
  // State for the current step in the installer flow
  const [installStep, setInstallStep] = m2.useState("intro");
  // State for error or status messages
  const [statusMessage, setStatusMessage] = m2.useState("");
  // State for shell alias setup output
  const [aliasSetupOutput, setAliasSetupOutput] = m2.useState("");

  // Handle user cancellation on component unmount
  useCtrlKeyActionHandler(() => {
    pO("canceled", "user_exit");
    Q7(1); // Exit the installer
  });

  // Log the start of the installer
  m2.useEffect(() => {
    pO("start");
  }, []);

  // Effect to handle side effects based on the current install step
  m2.useEffect(() => {
    /**
     * Handles the local package installation process.
     */
    const handleInstall = async () => {
      try {
        // Check if local package creation is possible
        if (!i1A()) {
          setStatusMessage("Local package creation failed");
          setInstallStep("error");
          pO("failure", "environement_setup");
          return;
        }
        // Attempt to install the package
        const installResult = await installClaudeCliPackage();
        switch (installResult) {
          case "success":
            setInstallStep("success");
            pO("success");
            break;
          case "in_progress":
            setStatusMessage("Update already in progress");
            setInstallStep("error");
            pO("failure", "in_progress");
            break;
          case "install_failed":
            setStatusMessage(`Install of @anthropic-ai/claude-code failed`);
            setInstallStep("error");
            pO("failure", "other_failure");
            break;
        }
      } catch (error) {
        setStatusMessage(String(error));
        setInstallStep("error");
        pO("failure", "unexpected_error");
      }
    };

    /**
     * Handles shell alias setup for 'claude'.
     */
    const handleAliasSetup = async () => {
      try {
        const aliasOutput = await addClaudeAliasToShellConfig();
        setAliasSetupOutput(aliasOutput);
        setInstallStep("setup");
      } catch (error) {
        setStatusMessage(String(error));
        setInstallStep("error");
      }
    };

    /**
     * Handles global npm package uninstallation.
     */
    const handleUninstall = async () => {
      try {
        const uninstallSuccess = await uninstallGlobalClaudeCodePackage();
        if (uninstallSuccess) {
          setInstallStep("uninstall-success");
        } else {
          setInstallStep("uninstall-failed");
        }
      } catch (error) {
        setStatusMessage(String(error));
        setInstallStep("uninstall-failed");
      }
    };

    // Trigger side effects based on the current step
    switch (installStep) {
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
  }, [installStep]);

  // Theme stylesheet for consistent UI colors
  const theme = getThemeStylesheet();

  // UI for the intro step
  if (installStep === "intro") {
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
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setInstallStep("installing") })
    );
  }

  // UI for the installing step
  if (installStep === "installing") {
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

  // UI for successful local installation
  if (installStep === "success") {
    return m2.default.createElement(
      g,
      { flexDirection: "column", marginY: 1 },
      m2.default.createElement(_, { bold: true, color: theme.success }, "✓ Local installation successful!"),
      m2.default.createElement(
        g,
        { marginY: 1 },
        m2.default.createElement(_, null, "Next, let'createInteractionAccessor add an alias for `claude`")
      ),
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setInstallStep("setup-alias") })
    );
  }

  // UI for alias setup step
  if (installStep === "setup-alias") {
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

  // UI for alias setup completion
  if (installStep === "setup") {
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
      m2.default.createElement(handleKeyPressPrompt, { onPress: () => setInstallStep("uninstall") })
    );
  }

  // UI for uninstalling global npm package
  if (installStep === "uninstall") {
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

  // UI for successful global uninstall
  if (installStep === "uninstall-success") {
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

  // UI for failed global uninstall
  if (installStep === "uninstall-failed") {
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

  // UI for error state
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

module.exports = getInstallingStatusUI;