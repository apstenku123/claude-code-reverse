/**
 * Handles bypassing permissions, restores terminal settings if needed, performs cleanup, and manages session exit feedback.
 *
 * @param {any} sourceObservable - The observable source to be processed (passed to setShellCurrentWorkingDirectory).
 * @param {string} config - Configuration string, may be 'bypassPermissions' to skip permission checks.
 * @param {boolean} [shouldSubscribe] - Optional flag to control subscription logic.
 * @returns {Promise<void>} Resolves when all operations are complete.
 */
async function handleBypassPermissionsAndCleanup(sourceObservable, config, shouldSubscribe) {
  // Check Node.js version compatibility
  const nodeMajorVersion = process.version.match(/^createRangeIterator(\d+)\./)?.[1];
  if (!nodeMajorVersion || parseInt(nodeMajorVersion, 10) < 18) {
    console.error(FA.bold.red("Error: Claude Code requires Node.js version 18 or higher."));
    process.exit(1);
  }

  // Attempt to restore iTerm2 settings if an interrupted setup was detected
  const iTerm2RestoreStatus = restoreIterm2SettingsFromBackup();
  if (iTerm2RestoreStatus.status === "restored") {
    console.log(FA.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));
  } else if (iTerm2RestoreStatus.status === "failed") {
    console.error(
      FA.red(
        `Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${iTerm2RestoreStatus.backupPath}.`
      )
    );
  }

  // Attempt to restore Terminal.app settings if an interrupted setup was detected
  try {
    const terminalRestoreStatus = await restoreTerminalSettingsFromBackup();
    if (terminalRestoreStatus.status === "restored") {
      console.log(FA.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));
    } else if (terminalRestoreStatus.status === "failed") {
      console.error(
        FA.red(
          `Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${terminalRestoreStatus.backupPath}.`
        )
      );
    }
  } catch (terminalRestoreError) {
    // Log any error encountered during Terminal.app restoration
    reportErrorIfAllowed(terminalRestoreError instanceof Error ? terminalRestoreError : new Error(String(terminalRestoreError)));
  }

  // Determine if subscription logic should be enabled
  const isSubscriptionEnabled = shouldSubscribe ?? false;

  // Run a series of initialization and cleanup routines
  getProcessedInteractionEntries();
  q_2();
  processInteractionEntriesAndStartTransactions();
  cleanupOldNativeVersions();
  RB0();
  yAA();
  pH1(isSubscriptionEnabled);
  UW();
  WE(isSubscriptionEnabled);
  CL();
  IS();
  wy1();
  subscribeToAgentConfigFile([], g9());
  updateRecommendedSubscriptionIfNeeded();
  getTenguExitFeedbackVisibility();
  // Handle async cleanup with error logging
  fetchAndProcessHeaders().catch(reportErrorIfAllowed);
  Qn0();

  // Setup an AbortController to abort after 3 seconds
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 3000);
  w51(iA(), abortController.signal, []);

  // Process the observable source
  setShellCurrentWorkingDirectory(sourceObservable);

  // If bypassPermissions is requested, ensure not running as root for security
  if (config === "bypassPermissions") {
    if (
      process.platform !== "win32" &&
      typeof process.getuid === "function" &&
      process.getuid() === 0
    ) {
      console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons");
      process.exit(1);
    }
  }

  // Retrieve last session statistics
  const lastSessionStats = getProjectSubscriptionConfig();
  if (
    lastSessionStats.lastCost !== undefined &&
    lastSessionStats.lastDuration !== undefined
  ) {
    // Log exit event with session statistics
    logTelemetryEventIfEnabled("tengu_exit", {
      last_session_cost: lastSessionStats.lastCost,
      last_session_api_duration: lastSessionStats.lastAPIDuration,
      last_session_duration: lastSessionStats.lastDuration,
      last_session_lines_added: lastSessionStats.lastLinesAdded,
      last_session_lines_removed: lastSessionStats.lastLinesRemoved,
      last_session_total_input_tokens: lastSessionStats.lastTotalInputTokens,
      last_session_total_output_tokens: lastSessionStats.lastTotalOutputTokens,
      last_session_total_cache_creation_input_tokens: lastSessionStats.lastTotalCacheCreationInputTokens,
      last_session_total_cache_read_input_tokens: lastSessionStats.lastTotalCacheReadInputTokens,
      last_session_id: lastSessionStats.lastSessionId
    });
    // Clear session statistics after logging
    updateProjectInConfig({
      ...lastSessionStats,
      lastCost: undefined,
      lastAPIDuration: undefined,
      lastDuration: undefined,
      lastLinesAdded: undefined,
      lastLinesRemoved: undefined,
      lastTotalInputTokens: undefined,
      lastTotalOutputTokens: undefined,
      lastTotalCacheCreationInputTokens: undefined,
      lastTotalCacheReadInputTokens: undefined,
      lastSessionId: undefined
    });
  }

  // If there is pending exit feedback, log and clear isBlobOrFileLikeObject
  if (lastSessionStats.pendingExitFeedback) {
    const feedback = lastSessionStats.pendingExitFeedback;
    logTelemetryEventIfEnabled("tengu_exit_feedback", {
      feedback_choice: feedback.feedbackChoice,
      feedback_details: feedback.feedbackDetails,
      last_session_id: feedback.sessionId,
      model: feedback.model
    });
    updateProjectInConfig({
      ...lastSessionStats,
      pendingExitFeedback: undefined
    });
  }

  // Placeholder for future logic (was: if (!1) try {} catch {})
}

module.exports = handleBypassPermissionsAndCleanup;