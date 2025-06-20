/**
 * Handles the onboarding/preflight flow for the application, including theme selection,
 * OAuth setup, API key handling, security notes, and terminal setup. Manages step progression,
 * analytics events, and conditional rendering of onboarding steps based on environment and user state.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onDone - Callback invoked when onboarding is complete.
 * @returns {React.ReactElement} The onboarding flow React element.
 */
function getPreflightOnboardingFlow({ onDone }) {
  // Step index state
  const [currentStepIndex, setCurrentStepIndex] = z4.useState(0);

  // Retrieve configuration, OAuth status, and theme styles
  const config = getCachedOrFreshConfig(); // getCachedOrFreshConfig
  const isOauthEnabled = isAnthropicApiKeyMissing();
  const themeStyles = getThemeStylesheet(); // getThemeStylesheet

  // Analytics: fire event when OAuth enabled state changes
  z4.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_began_setup", {
      oauthEnabled: isOauthEnabled
    });
  }, [isOauthEnabled]);

  /**
   * Advances to the next onboarding step, or calls onDone if finished.
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
   * Handles theme selection and proceeds to the next step.
   * @param {string} selectedTheme - The selected theme name.
   */
  function handleThemeSelect(selectedTheme) {
    updateProjectsAccessor({
      ...config,
      theme: selectedTheme
    });
    goToNextStep();
  }

  // Terminal exit key state
  const terminalExitState = useCtrlKeyActionHandler();

  // Keyboard event handler for onboarding steps
  D0(async (keyEvent, eventMeta) => {
    const currentStep = onboardingSteps[currentStepIndex];
    // Handle return key on security step
    if (eventMeta.return && currentStep && ["security"].includes(currentStep.id)) {
      if (currentStepIndex === onboardingSteps.length - 1) {
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
    z4.default.createElement(g, {
      flexDirection: "column",
      width: 70
    },
      z4.default.createElement(OrderedListWithMarkers, null,
        z4.default.createElement(OrderedListWithMarkers.Item, null,
          z4.default.createElement(_, null, "Claude can make mistakes"),
          z4.default.createElement(_, {
            color: themeStyles.secondaryText,
            wrap: "wrap"
          },
            "You should always review Claude'createInteractionAccessor responses, especially when",
            z4.default.createElement(RG, null),
            "running code.",
            z4.default.createElement(RG, null)
          )
        ),
        z4.default.createElement(OrderedListWithMarkers.Item, null,
          z4.default.createElement(_, null, "Due to prompt injection risks, only use isBlobOrFileLikeObject with code you trust"),
          z4.default.createElement(_, {
            color: themeStyles.secondaryText,
            wrap: "wrap"
          },
            "For more details see:",
            z4.default.createElement(RG, null),
            z4.default.createElement(renderLinkOrText, {
              url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security"
            })
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
    const key = WF(process.env.ANTHROPIC_API_KEY);
    if (getApiKeyApprovalStatus(key) === "new") return key;
  }, []);

  // Build onboarding steps array based on environment and state
  const onboardingSteps = [];

  if (isOauthEnabled) {
    onboardingSteps.push({
      id: "preflight",
      component: preflightComponent
    });
  }

  onboardingSteps.push({
    id: "theme",
    component: themeSelectionComponent
  });

  if (isOauthEnabled) {
    onboardingSteps.push({
      id: "oauth",
      component: z4.default.createElement(OAuthLoginFlowAccessor, {
        onDone: goToNextStep
      })
    });
  }

  if (truncatedApiKey) {
    onboardingSteps.push({
      id: "api-key",
      component: z4.default.createElement(CustomApiKeyApprovalPrompt, {
        customApiKeyTruncated: truncatedApiKey,
        onDone: goToNextStep
      })
    });
  }

  onboardingSteps.push({
    id: "security",
    component: securityNotesComponent
  });

  // Terminal setup step (if applicable)
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

  // Render onboarding flow
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

module.exports = getPreflightOnboardingFlow;