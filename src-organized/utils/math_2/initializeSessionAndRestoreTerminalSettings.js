/**
 * Initializes the session, restores terminal settings if needed, and handles session exit feedback and metrics.
 *
 * @param {any} sourceObservable - The source observable or input for the session.
 * @param {string} config - Configuration string, e.g., 'bypassPermissions'.
 * @param {boolean} [shouldSkipFeedback=false] - Optional flag to skip feedback prompts.
 * @returns {Promise<void>} Resolves when initialization and cleanup are complete.
 */
async function initializeSessionAndRestoreTerminalSettings(sourceObservable, config, shouldSkipFeedback) {
  // Check Node.js version
  const nodeMajorVersion = process.version.match(/^createRangeIterator(\d+)\./)?.[1];
  if (!nodeMajorVersion || parseInt(nodeMajorVersion, 10) < 18) {
    console.error(FA.bold.red("Error: Claude Code requires Node.js version 18 or higher."));
    process.exit(1);
  }

  // Attempt to restore iTerm2 settings if previously interrupted
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

  // Attempt to restore Terminal.app settings if previously interrupted
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
  } catch (restoreError) {
    // Log any errors that occur during Terminal.app restoration
    reportErrorIfAllowed(restoreError instanceof Error ? restoreError : new Error(String(restoreError)));
  }

  // Determine whether to skip feedback (default: false)
  const skipFeedback = shouldSkipFeedback ?? false;

  // Initialize various session and system modules
  getProcessedInteractionEntries();
  q_2();
  processInteractionEntriesAndStartTransactions();
  cleanupOldNativeVersions();
  RB0();
  yAA();
  pH1(skipFeedback);
  UW();
  WE(skipFeedback);
  CL();
  IS();
  wy1();
  subscribeToAgentConfigFile([], g9());
  updateRecommendedSubscriptionIfNeeded();
  getTenguExitFeedbackVisibility();
  fetchAndProcessHeaders().catch(reportErrorIfAllowed);
  Qn0();

  // Set up an abort controller to abort after 3 seconds
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 3000);
  w51(iA(), abortController.signal, []);

  // Perform configuration-specific checks
  setShellCurrentWorkingDirectory(sourceObservable);
  if (config === "bypassPermissions") {
    // Security check: do not allow bypassing permissions as root
    if (
      process.platform !== "win32" &&
      typeof process.getuid === "function" &&
      process.getuid() === 0
    ) {
      console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons");
      process.exit(1);
    }
  }

  // Retrieve last session metrics and feedback
  const lastSessionData = getProjectSubscriptionConfig();
  if (
    lastSessionData.lastCost !== undefined &&
    lastSessionData.lastDuration !== undefined
  ) {
    // Log exit metrics
    logTelemetryEventIfEnabled("tengu_exit", {
      last_session_cost: lastSessionData.lastCost,
      last_session_api_duration: lastSessionData.lastAPIDuration,
      last_session_duration: lastSessionData.lastDuration,
      last_session_lines_added: lastSessionData.lastLinesAdded,
      last_session_lines_removed: lastSessionData.lastLinesRemoved,
      last_session_total_input_tokens: lastSessionData.lastTotalInputTokens,
      last_session_total_output_tokens: lastSessionData.lastTotalOutputTokens,
      last_session_total_cache_creation_input_tokens: lastSessionData.lastTotalCacheCreationInputTokens,
      last_session_total_cache_read_input_tokens: lastSessionData.lastTotalCacheReadInputTokens,
      last_session_id: lastSessionData.lastSessionId
    });
    // Clear last session metrics
    updateProjectInConfig({
      ...lastSessionData,
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
  if (lastSessionData.pendingExitFeedback) {
    const feedback = lastSessionData.pendingExitFeedback;
    logTelemetryEventIfEnabled("tengu_exit_feedback", {
      feedback_choice: feedback.feedbackChoice,
      feedback_details: feedback.feedbackDetails,
      last_session_id: feedback.sessionId,
      model: feedback.model
    });
    // Clear pending exit feedback
    updateProjectInConfig({
      ...lastSessionData,
      pendingExitFeedback: undefined
    });
  }

  // Placeholder for future error handling (currently does nothing)
  if (false) {
    try {
      // No-op
    } catch {}
  }
}

module.exports = initializeSessionAndRestoreTerminalSettings;