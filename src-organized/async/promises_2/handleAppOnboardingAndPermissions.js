/**
 * Handles onboarding flows, announcements, API key prompts, and permissions for the app.
 * This function ensures the user has completed onboarding, seen required announcements,
 * entered any required API keys, and accepted permissions as needed.
 *
 * @param {string} mode - The mode in which to run the onboarding/permissions logic. If 'bypassPermissions', skips some permission checks.
 * @returns {Promise<boolean>} - Returns true if onboarding was triggered, false otherwise.
 */
async function handleAppOnboardingAndPermissions(mode) {
  // Early exit if running in demo mode
  if (!(1 === "true") || process.env.IS_DEMO) return false;

  // Retrieve the current configuration (cached or fresh)
  let config = getCachedOrFreshConfig();
  let onboardingTriggered = false;

  // If onboarding is incomplete or theme is missing, trigger onboarding UI
  if (!config.theme || !config.hasCompletedOnboarding) {
    onboardingTriggered = true;
    await clearConsoleScreen(); // Possibly a UI refresh or state sync
    await new Promise(resolve => {
      // Mount onboarding UI
      const { unmount } = C8(
        JB.default.createElement(
          h3,
          { onChangeAppState: syncAppStateWithConfig },
          JB.default.createElement(OnboardingFlow, {
            onDone: async () => {
              completeOnboardingAndUpdateConfig(); // Possibly marks onboarding as done
              await clearConsoleScreen();
              unmount();
              resolve();
            }
          })
        ),
        { exitOnCtrlC: false }
      );
    });
  }

  // If onboarding is complete but getCachedOrFreshConfig announcement hasn'processRuleBeginHandlers been seen, show announcement UI
  if (
    config.hasCompletedOnboarding &&
    !config.hasSeenGAAnnounce &&
    !onboardingTriggered &&
    bz1() // Some condition for showing getCachedOrFreshConfig announcement
  ) {
    await clearConsoleScreen();
    await new Promise(resolve => {
      const { unmount } = C8(
        JB.default.createElement(
          h3,
          { onChangeAppState: syncAppStateWithConfig },
          JB.default.createElement(AnnouncementResponsiveRenderer, {
            onDismiss: async () => {
              const updatedConfig = getCachedOrFreshConfig();
              updateProjectsAccessor({ ...updatedConfig, hasSeenGAAnnounce: true });
              await clearConsoleScreen();
              unmount();
              resolve();
            }
          })
        ),
        { exitOnCtrlC: false }
      );
    });
  }

  // If an Anthropic API key is set, check if isBlobOrFileLikeObject'createInteractionAccessor new and prompt the user if so
  if (process.env.ANTHROPIC_API_KEY) {
    const apiKeyTruncated = WF(process.env.ANTHROPIC_API_KEY);
    if (getApiKeyApprovalStatus(apiKeyTruncated) === "new") {
      await new Promise(resolve => {
        const { unmount } = C8(
          JB.default.createElement(
            h3,
            { onChangeAppState: syncAppStateWithConfig },
            JB.default.createElement(CustomApiKeyApprovalPrompt, {
              customApiKeyTruncated: apiKeyTruncated,
              onDone: () => {
                unmount();
                resolve();
              }
            })
          ),
          { exitOnCtrlC: false }
        );
      });
    }
  }

  // Handle permissions and server status unless bypassing permissions or running in CLAUBBIT mode
  if (mode !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
    // If permissions are not granted, show permissions UI
    if (!hasProjectTrustDialogBeenAccepted()) {
      await new Promise(resolve => {
        const { unmount } = C8(
          JB.default.createElement(
            h3,
            null,
            JB.default.createElement(TrustDialog, {
              onDone: () => {
                unmount();
                resolve();
              }
            })
          ),
          { exitOnCtrlC: false }
        );
      });
    }
    // If there are pending server statuses, show server status UI
    if (await showPendingServerStatusUI(), await isExternalIncludesAllowed()) {
      await new Promise(resolve => {
        const { unmount } = C8(
          JB.default.createElement(
            h3,
            null,
            JB.default.createElement(ExternalIncludesApprovalDialog, {
              onDone: () => {
                unmount();
                resolve();
              }
            })
          ),
          { exitOnCtrlC: false }
        );
      });
    }
  }

  // If bypassing permissions, ensure the user has accepted bypass mode
  if (
    mode === "bypassPermissions" &&
    !getCachedOrFreshConfig().bypassPermissionsModeAccepted
  ) {
    await new Promise(resolve => {
      const { unmount } = C8(
        JB.default.createElement(
          h3,
          null,
          JB.default.createElement(BypassPermissionsModeDialog, {
            onAccept: () => {
              unmount();
              resolve();
            }
          })
        )
      );
    });
  }

  return onboardingTriggered;
}

module.exports = handleAppOnboardingAndPermissions;