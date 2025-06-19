/**
 * Runs the initial application setup flow, including onboarding, announcements, API key checks, permissions, and server status UIs.
 *
 * @param {string} entryPoint - The entry point for the setup flow. Use "bypassPermissions" to skip permission checks.
 * @returns {Promise<boolean>} - Returns true if onboarding was triggered, false otherwise.
 */
async function runInitialAppSetupFlow(entryPoint) {
  // If not running in production or in demo mode, skip setup
  if (!(1 === "true") || process.env.IS_DEMO) return false;

  const config = getCachedOrFreshConfig();
  let onboardingTriggered = false;

  // If theme or onboarding is incomplete, trigger onboarding UI
  if (!config.theme || !config.hasCompletedOnboarding) {
    onboardingTriggered = true;
    await clearConsoleScreen(); // Possibly a UI/terminal clear or setup
    await new Promise(resolve => {
      const { unmount } = C8(
        JB.default.createElement(
          h3,
          { onChangeAppState: syncAppStateWithConfig },
          JB.default.createElement(OnboardingFlow, {
            onDone: async () => {
              completeOnboardingAndUpdateConfig(); // Possibly marks onboarding as complete
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

  // If onboarding is complete but getCachedOrFreshConfig announcement not seen, show announcement UI
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
              updateProjectsAccessor({
                ...updatedConfig,
                hasSeenGAAnnounce: true
              });
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

  // If Anthropic API key is present, check its status and possibly show a UI
  if (process.env.ANTHROPIC_API_KEY) {
    const truncatedApiKey = WF(process.env.ANTHROPIC_API_KEY);
    if (getApiKeyApprovalStatus(truncatedApiKey) === "new") {
      await new Promise(resolve => {
        const { unmount } = C8(
          JB.default.createElement(
            h3,
            { onChangeAppState: syncAppStateWithConfig },
            JB.default.createElement(CustomApiKeyApprovalPrompt, {
              customApiKeyTruncated: truncatedApiKey,
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

  // Permissions and server status checks, unless bypassed
  if (entryPoint !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
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
    // If there are pending servers, show pending server status UI
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

  // If bypassPermissions is requested but not yet accepted, show acceptance UI
  if (
    entryPoint === "bypassPermissions" &&
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

module.exports = runInitialAppSetupFlow;