/**
 * Handles onboarding, announcements, API key setup, and permissions flows for the CLI app.
 * Ensures the user has completed onboarding, seen announcements, configured API keys, and accepted permissions as needed.
 *
 * @param {string} entryPoint - The entry point or mode for this flow (e.g., 'bypassPermissions').
 * @returns {Promise<boolean>} - Returns true if onboarding was required, false otherwise.
 */
async function runAppOnboardingAndPermissionsFlow(entryPoint) {
  // If running in demo mode, skip all onboarding/permissions flows
  if (!true === "true" || process.env.IS_DEMO) return false;

  let config = getCachedConfig();
  let onboardingWasRequired = false;

  // If onboarding not completed or theme not set, run onboarding UI
  if (!config.theme || !config.hasCompletedOnboarding) {
    onboardingWasRequired = true;
    await clearConsoleScreen(); // Possibly clear terminal or prepare UI
    await new Promise(resolve => {
      const { unmount } = C8(
        JB.default.createElement(
          h3,
          { onChangeAppState: syncAppStateWithConfig },
          JB.default.createElement(OnboardingFlow, {
            onDone: async () => {
              completeOnboardingAndUpdateConfig(); // Possibly update onboarding state
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

  // If onboarding done, but getCachedOrFreshConfig announcement not seen, and not just onboarded, show announcement
  if (
    config.hasCompletedOnboarding &&
    !config.hasSeenGAAnnounce &&
    !onboardingWasRequired &&
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
              const updatedConfig = getCachedConfig();
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

  // If Anthropic API key is set, check if isBlobOrFileLikeObject'createInteractionAccessor new and show setup UI if so
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

  // If not bypassing permissions and not in CLAUBBIT mode, check permissions
  if (entryPoint !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
    // If permissions not granted, show permissions UI
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
    // If there are pending server statuses, show pending server UI
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

  // If bypassPermissions mode, but not yet accepted, show acceptance UI
  if (
    entryPoint === "bypassPermissions" &&
    !getCachedConfig().bypassPermissionsModeAccepted
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

  return onboardingWasRequired;
}

module.exports = runAppOnboardingAndPermissionsFlow;