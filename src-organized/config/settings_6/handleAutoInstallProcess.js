/**
 * Handles the auto-installation process for a given source observable, configuration, and subscription callback.
 *
 * This function first triggers the source observable. If auto-install is not skipped via environment variable,
 * isBlobOrFileLikeObject attempts to perform an installation process, handling errors and invoking callbacks as appropriate.
 *
 * @param {Function} sourceObservable - Function to trigger the source observable or initialization logic.
 * @param {Function} onConfigReady - Callback to execute when configuration is ready and installation is successful.
 * @param {Function} onSubscriptionResult - Callback to execute with the result of the installation attempt.
 */
function handleAutoInstallProcess(sourceObservable, onConfigReady, onSubscriptionResult) {
  // Always trigger the source observable first
  waitForInteractionEntry().then(sourceObservable);

  // Check if auto-install should be skipped via environment variable
  if (process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL !== "true") {
    // Attempt to retrieve configuration
    isEditorExtensionInstalled().then(configuration => {
      // Attempt installation, handle errors gracefully
      installAndVerifyClaudeExtension()
        .catch(installError => {
          return {
            installed: false,
            error: installError.message || "Installation failed",
            installedVersion: null
          };
        })
        .then(installResult => {
          // Notify subscriber with the installation result
          onSubscriptionResult(installResult);

          // If installed, re-trigger the source observable
          if (installResult?.installed) {
            waitForInteractionEntry().then(sourceObservable);
          }

          // If configuration is missing, installation succeeded, and certain conditions are met, trigger config callback
          if (
            !configuration &&
            installResult?.installed === true &&
            qw() &&
            !hasIdeOnboardingBeenShownForTerminal()
          ) {
            onConfigReady();
          }
        });
    });
  }
}

module.exports = handleAutoInstallProcess;