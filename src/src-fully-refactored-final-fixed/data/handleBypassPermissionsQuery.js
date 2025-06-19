/**
 * Handles the bypass permissions query process, including environment validation, restoration of terminal settings,
 * initialization of various modules, and session feedback/telemetry reporting. Ensures Node.js version compatibility,
 * manages interrupted setup restoration for iTerm2 and Terminal.app, and processes session exit feedback.
 *
 * @param {any} sourceObservable - The source observable or data input for the process.
 * @param {string} config - Configuration string, e.g., 'bypassPermissions'.
 * @param {any} subscription - Optional subscription or flag for downstream logic.
 * @returns {void}
 */
async function handleBypassPermissionsQuery(sourceObservable, config, subscription) {
  // Check Node.js version compatibility
  const nodeMajorVersion = process.version.match(/^createRangeIterator(\d+)\./)?.[1];
  if (!nodeMajorVersion || parseInt(nodeMajorVersion, 10) < 18) {
    console.error(FA.bold.red("Error: Claude Code requires Node.js version 18 or higher."));
    process.exit(1);
  }

  // Attempt to restore iTerm2 settings if interrupted
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

  // Attempt to restore Terminal.app settings if interrupted
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
  } catch (error) {
    // Handle restoration errors
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
  }

  // Determine if a subscription flag is set
  const isSubscription = subscription ?? false;

  // Initialize various modules and perform setup routines
  getProcessedInteractionEntries();
  q_2();
  processInteractionEntriesAndStartTransactions();
  cleanupOldNativeVersions();
  RB0();
  yAA();
  pH1(isSubscription);
  UW();
  WE(isSubscription);
  CL();
  IS();
  wy1();
  subscribeToAgentConfigFile([], g9());
  updateRecommendedSubscriptionIfNeeded();
  getTenguExitFeedbackVisibility();
  fetchAndProcessHeaders().catch(reportErrorIfAllowed);
  Qn0();

  // Setup an abort controller for timeout handling
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 3000);
  w51(iA(), abortController.signal, []);

  // Call setShellCurrentWorkingDirectory with the source observable
  setShellCurrentWorkingDirectory(sourceObservable);

  // Security check for bypassPermissions config
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

  // Retrieve last session info for telemetry and feedback
  const lastSessionInfo = getProjectSubscriptionConfig();
  if (
    lastSessionInfo.lastCost !== undefined &&
    lastSessionInfo.lastDuration !== undefined
  ) {
    // Report session exit telemetry
    logTelemetryEventIfEnabled("tengu_exit", {
      last_session_cost: lastSessionInfo.lastCost,
      last_session_api_duration: lastSessionInfo.lastAPIDuration,
      last_session_duration: lastSessionInfo.lastDuration,
      last_session_lines_added: lastSessionInfo.lastLinesAdded,
      last_session_lines_removed: lastSessionInfo.lastLinesRemoved,
      last_session_total_input_tokens: lastSessionInfo.lastTotalInputTokens,
      last_session_total_output_tokens: lastSessionInfo.lastTotalOutputTokens,
      last_session_total_cache_creation_input_tokens: lastSessionInfo.lastTotalCacheCreationInputTokens,
      last_session_total_cache_read_input_tokens: lastSessionInfo.lastTotalCacheReadInputTokens,
      last_session_id: lastSessionInfo.lastSessionId
    });
    // Clear session info after reporting
    updateProjectInConfig({
      ...lastSessionInfo,
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
  if (lastSessionInfo.pendingExitFeedback) {
    const feedback = lastSessionInfo.pendingExitFeedback;
    logTelemetryEventIfEnabled("tengu_exit_feedback", {
      feedback_choice: feedback.feedbackChoice,
      feedback_details: feedback.feedbackDetails,
      last_session_id: feedback.sessionId,
      model: feedback.model
    });
    // Clear pending feedback after reporting
    updateProjectInConfig({
      ...lastSessionInfo,
      pendingExitFeedback: undefined
    });
  }

  // Placeholder for future logic (original code: if (!1) try {} catch {})
}

module.exports = handleBypassPermissionsQuery;