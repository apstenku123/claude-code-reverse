/**
 * Handles the auto-installation process and manages activity addition if not finished.
 *
 * This function first triggers the source observable. If auto-install is not skipped via environment variable,
 * isBlobOrFileLikeObject attempts to perform the installation process. The result of the installation is passed to the provided callback.
 * If installation succeeds, isBlobOrFileLikeObject may re-trigger the source observable and conditionally add a new activity if not finished.
 *
 * @param {Function} triggerSourceObservable - Function to trigger the source observable (e.g., waitForInteractionEntry).
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Function} handleInstallationResult - Callback to handle the result of the installation process.
 * @returns {void}
 */
function handleAutoInstallAndActivity(triggerSourceObservable, addActivityIfNotFinished, handleInstallationResult) {
  // Always trigger the source observable first
  triggerSourceObservable().then();

  // Check if auto-install should be skipped via environment variable
  if (process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL !== "true") {
    // Attempt to retrieve installation context
    isEditorExtensionInstalled().then(installationContext => {
      // Attempt to perform the installation
      installAndVerifyClaudeExtension()
        .catch(installError => {
          // If installation fails, return a standardized error object
          return {
            installed: false,
            error: installError.message || "Installation failed",
            installedVersion: null
          };
        })
        .then(installationResult => {
          // Pass the installation result to the provided callback
          handleInstallationResult(installationResult);

          // If installed, re-trigger the source observable
          if (installationResult?.installed) {
            triggerSourceObservable().then();
          }

          // If not already installed, installation succeeded, conditions met, and not finished, add activity
          if (
            !installationContext &&
            installationResult?.installed === true &&
            qw() &&
            !hasIdeOnboardingBeenShownForTerminal()
          ) {
            addActivityIfNotFinished();
          }
        });
    });
  }
}

module.exports = handleAutoInstallAndActivity;