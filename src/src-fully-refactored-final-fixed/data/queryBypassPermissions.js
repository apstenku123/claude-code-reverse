/**
 * Handles the bypass permissions query process, including environment validation, restoration of terminal settings,
 * initialization of various modules, and session cleanup. Ensures Node.js version compatibility, restores interrupted
 * terminal setups, initializes application modules, and manages session feedback and statistics.
 *
 * @param {any} sourceObservable - The observable or source object to be processed.
 * @param {string} config - Configuration string, e.g., 'bypassPermissions' to indicate bypass mode.
 * @param {any} subscription - Optional subscription or flag for downstream logic.
 * @returns {Promise<void>} Resolves when the process is complete.
 */
async function queryBypassPermissions(sourceObservable, config, subscription) {
  // Check Node.js version compatibility
  const nodeMajorVersion = process.version.match(/^createRangeIterator(\d+)\./)?.[1];
  if (!nodeMajorVersion || parseInt(nodeMajorVersion, 10) < 18) {
    console.error(FA.bold.red("Error: Claude Code requires Node.js version 18 or higher."));
    process.exit(1);
  }

  // Attempt to restore iTerm2 settings if previously interrupted
  const iTermRestoreResult = restoreIterm2SettingsFromBackup();
  if (iTermRestoreResult.status === "restored") {
    console.log(FA.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));
  } else if (iTermRestoreResult.status === "failed") {
    console.error(
      FA.red(
        `Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${iTermRestoreResult.backupPath}.`
      )
    );
  }

  // Attempt to restore Terminal.app settings if previously interrupted
  try {
    const terminalRestoreResult = await restoreTerminalSettingsFromBackup();
    if (terminalRestoreResult.status === "restored") {
      console.log(FA.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));
    } else if (terminalRestoreResult.status === "failed") {
      console.error(
        FA.red(
          `Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${terminalRestoreResult.backupPath}.`
        )
      );
    }
  } catch (terminalRestoreError) {
    // Log any errors during Terminal.app restoration
    reportErrorIfAllowed(terminalRestoreError instanceof Error ? terminalRestoreError : new Error(String(terminalRestoreError)));
  }

  // Determine if a subscription flag is set
  const isSubscribed = subscription ?? false;

  // Initialize various application modules and perform setup routines
  getProcessedInteractionEntries();
  q_2();
  processInteractionEntriesAndStartTransactions();
  cleanupOldNativeVersions(); // cleanupOldNativeVersions
  RB0();
  yAA();
  pH1(isSubscribed);
  UW();
  WE(isSubscribed);
  CL();
  IS();
  wy1();
  subscribeToAgentConfigFile([], g9()); // subscribeToAgentConfigFile
  updateRecommendedSubscriptionIfNeeded();
  getTenguExitFeedbackVisibility();
  fetchAndProcessHeaders().catch(reportErrorIfAllowed);
  Qn0();

  // Setup an abort controller to limit the duration of a specific async operation
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 3000);
  w51(iA(), abortController.signal, []);

  // Call setShellCurrentWorkingDirectory with the source observable
  setShellCurrentWorkingDirectory(sourceObservable);

  // Security check: prevent bypassPermissions with root privileges on non-Windows platforms
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

  // Retrieve last session statistics and feedback
  const lastSessionStats = getProjectSubscriptionConfig();
  if (
    lastSessionStats.lastCost !== undefined &&
    lastSessionStats.lastDuration !== undefined
  ) {
    // Log session exit event with statistics
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
    // Clear session statistics
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

  // Handle pending exit feedback if present
  if (lastSessionStats.pendingExitFeedback) {
    const feedback = lastSessionStats.pendingExitFeedback;
    logTelemetryEventIfEnabled("tengu_exit_feedback", {
      feedback_choice: feedback.feedbackChoice,
      feedback_details: feedback.feedbackDetails,
      last_session_id: feedback.sessionId,
      model: feedback.model
    });
    // Clear pending exit feedback
    updateProjectInConfig({
      ...lastSessionStats,
      pendingExitFeedback: undefined
    });
  }

  // Placeholder for additional logic (original code: if (!1) try {} catch {})
}

module.exports = queryBypassPermissions;
