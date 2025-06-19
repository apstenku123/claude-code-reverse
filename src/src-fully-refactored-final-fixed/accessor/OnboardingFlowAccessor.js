/**
 * Handles the onboarding flow for the application, managing steps such as theme selection, OAuth, API key entry, security notes, and terminal setup.
 * Tracks the current onboarding step, handles user interactions, and triggers analytics events.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onDone - Callback invoked when onboarding is complete.
 * @returns {React.ReactElement} The onboarding flow React component.
 */
function OnboardingFlowAccessor({ onDone }) {
  // State for current onboarding step index
  const [currentStepIndex, setCurrentStepIndex] = z4.useState(0);

  // Retrieve user info, OAuth status, and theme styles
  const userInfo = getCachedOrFreshConfig();
  const isOauthEnabled = isAnthropicApiKeyMissing();
  const themeStyles = getThemeStylesheet();

  // Track onboarding start with analytics
  z4.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_began_setup", {
      oauthEnabled: isOauthEnabled
    });
  }, [isOauthEnabled]);

  /**
   * Advance to the next onboarding step, or finish if at the end.
   */
  function goToNextStep() {
    if (currentStepIndex < onboardingSteps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      logTelemetryEventIfEnabled("tengu_onboarding_step", {
        oauthEnabled: isOauthEnabled,
        stepId: onboardingSteps[nextStepIndex]?.id
      });
    } else {
      onDone();
    }
  }

  /**
   * Handle theme selection and proceed to next step.
   * @param {string} selectedTheme - The selected theme name.
   */
  function handleThemeSelect(selectedTheme) {
    updateProjectsAccessor({
      ...userInfo,
      theme: selectedTheme
    });
    goToNextStep();
  }

  // Terminal exit key state
  const terminalExitState = useCtrlKeyActionHandler();

  // Handle onboarding step exit and escape events
  D0(async (event, eventState) => {
    const currentStep = onboardingSteps[currentStepIndex];
    if (eventState.return && currentStep && ["security"].includes(currentStep.id)) {
      if (currentStepIndex === onboardingSteps.length - 1) {
        onDone();
        return;
      } else {
        if (currentStep.id === "security") await clearConsoleScreen();
        goToNextStep();
      }
    } else if (eventState.escape && currentStep?.id === "terminal-setup") {
      goToNextStep();
    }
  });

  // Theme selection component
  const themeSelectionComponent = z4.default.createElement(aH1, {
    initialTheme: bY.theme,
    onThemeSelect: handleThemeSelect,
    showIntroText: true,
    helpText: "To change this later, run /theme",
    hideEscToCancel: true,
    skipExitHandling: true
  });

  // Security notes component
  const securityNotesComponent = z4.default.createElement(g, {
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

  // Preflight (OAuth) component
  const preflightComponent = z4.default.createElement(ConnectivityChecker, {
    onSuccess: goToNextStep
  });

  // Memoized truncated API key (if present)
  const truncatedApiKey = z4.useMemo(() => {
    if (!process.env.ANTHROPIC_API_KEY) return "";
    const truncated = WF(process.env.ANTHROPIC_API_KEY);
    if (getApiKeyApprovalStatus(truncated) === "new") return truncated;
  }, []);

  // Build onboarding steps array
  const onboardingSteps = [];

  // Add preflight step if OAuth is enabled
  if (isOauthEnabled) {
    onboardingSteps.push({
      id: "preflight",
      component: preflightComponent
    });
  }

  // Add theme selection step
  onboardingSteps.push({
    id: "theme",
    component: themeSelectionComponent
  });

  // Add OAuth step if enabled
  if (isOauthEnabled) {
    onboardingSteps.push({
      id: "oauth",
      component: z4.default.createElement(OAuthLoginFlowAccessor, { onDone: goToNextStep })
    });
  }

  // Add API key step if truncated key is present
  if (truncatedApiKey) {
    onboardingSteps.push({
      id: "api-key",
      component: z4.default.createElement(CustomApiKeyApprovalPrompt, {
        customApiKeyTruncated: truncatedApiKey,
        onDone: goToNextStep
      })
    });
  }

  // Add security notes step
  onboardingSteps.push({
    id: "security",
    component: securityNotesComponent
  });

  // Add terminal setup step if supported
  if (Bo()) {
    onboardingSteps.push({
      id: "terminal-setup",
      component: z4.default.createElement(g, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1
      },
        z4.default.createElement(_, { bold: true }, "Use ", m0, "'createInteractionAccessor terminal setup?"),
        z4.default.createElement(g, {
          flexDirection: "column",
          width: 70,
          gap: 1
        },
          z4.default.createElement(_, null, "For the optimal coding experience, enable the recommended settings",
            z4.default.createElement(RG, null),
            "for your terminal:", " ",
            pA.terminal === "Apple_Terminal"
              ? "Option+Enter for newlines and visual bell"
              : "Shift+Enter for newlines"
          ),
          z4.default.createElement(SelectableOptionsList, {
            options: [
              { label: "Yes, use recommended settings", value: "install" },
              { label: "No, maybe later with /terminal-setup", value: "no" }
            ],
            onChange: optionValue => {
              if (optionValue === "install") {
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
            terminalExitState.pending
              ? z4.default.createElement(z4.default.Fragment, null, "Press ", terminalExitState.keyName, " again to exit")
              : z4.default.createElement(z4.default.Fragment, null, "Enter to confirm · Esc to skip")
          )
        )
      )
    });
  }

  // Render onboarding flow UI
  return z4.default.createElement(g, {
    flexDirection: "column",
    gap: 1
  },
    onboardingSteps[currentStepIndex]?.id !== "oauth" && z4.default.createElement(renderWelcomeBanner, null),
    z4.default.createElement(g, {
      flexDirection: "column",
      padding: 0,
      gap: 0
    },
      onboardingSteps[currentStepIndex]?.component,
      terminalExitState.pending && z4.default.createElement(g, { padding: 1 },
        z4.default.createElement(_, { dimColor: true },
          "Press ", terminalExitState.keyName, " again to exit"
        )
      )
    )
  );
}

module.exports = OnboardingFlowAccessor;