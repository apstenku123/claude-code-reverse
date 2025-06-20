/**
 * OnboardingFlow component manages the multi-step onboarding process for the application.
 * It handles theme selection, API key setup, OAuth, security notes, and terminal setup steps.
 *
 * @param {Object} props - The component props
 * @param {Function} props.onDone - Callback invoked when onboarding is complete
 * @returns {React.ReactElement} The rendered onboarding flow UI
 */
function OnboardingFlow({ onDone }) {
  // Step index state
  const [currentStepIndex, setCurrentStepIndex] = z4.useState(0);
  // Cached or fresh config
  const config = getCachedOrFreshConfig();
  // Whether OAuth is enabled
  const isOauthEnabled = isAnthropicApiKeyMissing();
  // Theme stylesheet (colors, etc)
  const themeStyles = getThemeStylesheet();

  // Track onboarding start event
  z4.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_began_setup", {
      oauthEnabled: isOauthEnabled
    });
  }, [isOauthEnabled]);

  /**
   * Advance to the next onboarding step, or finish if at the end
   */
  function goToNextStep() {
    if (currentStepIndex < steps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      logTelemetryEventIfEnabled("tengu_onboarding_step", {
        oauthEnabled: isOauthEnabled,
        stepId: steps[nextStepIndex]?.id
      });
    } else {
      onDone();
    }
  }

  /**
   * Handle theme selection and advance to next step
   * @param {string} selectedTheme - The selected theme name
   */
  function handleThemeSelect(selectedTheme) {
    updateProjectsAccessor({
      ...config,
      theme: selectedTheme
    });
    goToNextStep();
  }

  // Terminal exit key state (for terminal-setup step)
  const terminalExitKey = useCtrlKeyActionHandler();

  // Keyboard event handler for onboarding steps
  D0(async (keyEvent, eventMeta) => {
    const currentStep = steps[currentStepIndex];
    // Handle return key on security step
    if (eventMeta.return && currentStep && ["security"].includes(currentStep.id)) {
      if (currentStepIndex === steps.length - 1) {
        onDone();
        return;
      } else {
        if (currentStep.id === "security") await clearConsoleScreen();
        goToNextStep();
      }
    } else if (eventMeta.escape && currentStep?.id === "terminal-setup") {
      goToNextStep();
    }
  });

  // Theme selection step component
  const themeStepComponent = z4.default.createElement(aH1, {
    initialTheme: bY.theme,
    onThemeSelect: handleThemeSelect,
    showIntroText: true,
    helpText: "To change this later, run /theme",
    hideEscToCancel: true,
    skipExitHandling: true
  });

  // Security notes step component
  const securityStepComponent = z4.default.createElement(g, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1
  },
    z4.default.createElement(_, { bold: true }, "Security notes:"),
    z4.default.createElement(g, { flexDirection: "column", width: 70 },
      z4.default.createElement(OrderedListWithMarkers, null,
        z4.default.createElement(OrderedListWithMarkers.Item, null,
          z4.default.createElement(_, null, "Claude can make mistakes"),
          z4.default.createElement(_, { color: themeStyles.secondaryText, wrap: "wrap" },
            "You should always review Claude'createInteractionAccessor responses, especially when",
            z4.default.createElement(RG, null),
            "running code.",
            z4.default.createElement(RG, null)
          )
        ),
        z4.default.createElement(OrderedListWithMarkers.Item, null,
          z4.default.createElement(_, null, "Due to prompt injection risks, only use isBlobOrFileLikeObject with code you trust"),
          z4.default.createElement(_, { color: themeStyles.secondaryText, wrap: "wrap" },
            "For more details see:",
            z4.default.createElement(RG, null),
            z4.default.createElement(renderLinkOrText, { url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security" })
          )
        )
      )
    ),
    z4.default.createElement(renderPressEnterPrompt, null)
  );

  // Preflight (OAuth) step component
  const preflightStepComponent = z4.default.createElement(ConnectivityChecker, {
    onSuccess: goToNextStep
  });

  // Memoized truncated API key for display
  const truncatedApiKey = z4.useMemo(() => {
    if (!process.env.ANTHROPIC_API_KEY) return "";
    const key = WF(process.env.ANTHROPIC_API_KEY);
    if (getApiKeyApprovalStatus(key) === "new") return key;
  }, []);

  // Build the onboarding steps array
  const steps = [];

  // Add preflight step if OAuth is enabled
  if (isOauthEnabled) {
    steps.push({
      id: "preflight",
      component: preflightStepComponent
    });
  }

  // Add theme selection step
  steps.push({
    id: "theme",
    component: themeStepComponent
  });

  // Add OAuth step if enabled
  if (isOauthEnabled) {
    steps.push({
      id: "oauth",
      component: z4.default.createElement(OAuthLoginFlowAccessor, { onDone: goToNextStep })
    });
  }

  // Add API key step if a new key is present
  if (truncatedApiKey) {
    steps.push({
      id: "api-key",
      component: z4.default.createElement(CustomApiKeyApprovalPrompt, {
        customApiKeyTruncated: truncatedApiKey,
        onDone: goToNextStep
      })
    });
  }

  // Add security notes step
  steps.push({
    id: "security",
    component: securityStepComponent
  });

  // Add terminal setup step if supported
  if (Bo()) {
    steps.push({
      id: "terminal-setup",
      component: z4.default.createElement(g, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1
      },
        z4.default.createElement(_, { bold: true }, `Use ${m0}'createInteractionAccessor terminal setup?`),
        z4.default.createElement(g, {
          flexDirection: "column",
          width: 70,
          gap: 1
        },
          z4.default.createElement(_, null,
            "For the optimal coding experience, enable the recommended settings",
            z4.default.createElement(RG, null),
            "for your terminal:",
            " ",
            pA.terminal === "Apple_Terminal"
              ? "Option+Enter for newlines and visual bell"
              : "Shift+Enter for newlines"
          ),
          z4.default.createElement(SelectableOptionsList, {
            options: [
              {
                label: "Yes, use recommended settings",
                value: "install"
              },
              {
                label: "No, maybe later with /terminal-setup",
                value: "no"
              }
            ],
            onChange: selectedOption => {
              if (selectedOption === "install") {
                getTerminalIntegrationObservable().then(() => {
                  goToNextStep();
                });
              } else {
                goToNextStep();
              }
            },
            onCancel: () => goToNextStep()
          }),
          z4.default.createElement(_, { dimColor: true },
            terminalExitKey.pending
              ? z4.default.createElement(z4.default.Fragment, null, "Press ", terminalExitKey.keyName, " again to exit")
              : z4.default.createElement(z4.default.Fragment, null, "Enter to confirm · Esc to skip")
          )
        )
      )
    });
  }

  // Render the onboarding UI
  return z4.default.createElement(g, {
    flexDirection: "column",
    gap: 1
  },
    // Show renderWelcomeBanner unless on the OAuth step
    steps[currentStepIndex]?.id !== "oauth" && z4.default.createElement(renderWelcomeBanner, null),
    z4.default.createElement(g, {
      flexDirection: "column",
      padding: 0,
      gap: 0
    },
      steps[currentStepIndex]?.component,
      terminalExitKey.pending && z4.default.createElement(g, { padding: 1 },
        z4.default.createElement(_, { dimColor: true },
          "Press ", terminalExitKey.keyName, " again to exit"
        )
      )
    )
  );
}

module.exports = OnboardingFlow;