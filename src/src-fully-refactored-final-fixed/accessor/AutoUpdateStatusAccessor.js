/**
 * AutoUpdateStatusAccessor
 *
 * This React component manages and displays the status of the auto-update process for the Claude Code package.
 * It checks for new versions, triggers updates when needed, and reports update results.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isUpdating - Whether an update is currently in progress
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state
 * @param {function} props.onAutoUpdaterResult - Callback to report the result of an update attempt
 * @param {Object} props.autoUpdaterResult - The result object of the last update attempt ({ version, status })
 * @param {boolean} props.showSuccessMessage - Whether to show a success message after update
 * @param {boolean} props.verbose - Whether to show verbose output
 * @returns {React.ReactElement|null} The rendered status UI, or null if not applicable
 */
function AutoUpdateStatusAccessor({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Theme styles for coloring output
  const theme = getThemeStylesheet();

  // State for holding the current and latest version info
  const [versionInfo, setVersionInfo] = _z1.useState({});

  /**
   * Checks for updates and triggers the auto-update process if needed.
   * Reports the result via onAutoUpdaterResult.
   */
  const checkAndUpdate = A5.useCallback(async () => {
    const config = getCachedOrFreshConfig();
    if (isUpdating) return;

    // Static package metadata
    const PACKAGE_METADATA = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    };
    const currentVersion = PACKAGE_METADATA.VERSION;
    const latestVersion = await Qz1();
    const isLocalInstall = isAutoUpdaterDisabled();

    // Update state with version info for display
    setVersionInfo({
      global: currentVersion,
      latest: latestVersion
    });

    // Only proceed if not a local install, both versions are present, and an update is available
    if (!isLocalInstall && currentVersion && latestVersion && !tP2.gte(currentVersion, latestVersion)) {
      const updateStartTime = Date.now();
      onChangeIsUpdating(true);
      let updateStatus;
      const wasMigrated = config.autoUpdaterStatus === "migrated";

      // Choose update method based on migration status
      if (wasMigrated) {
        updateStatus = await installClaudeCliPackage();
      } else {
        updateStatus = await performAutoUpdate();
      }

      onChangeIsUpdating(false);

      // Report update event (success or failure)
      if (updateStatus === "success") {
        logTelemetryEventIfEnabled("tengu_auto_updater_success", {
          fromVersion: currentVersion,
          toVersion: latestVersion,
          durationMs: Date.now() - updateStartTime,
          wasMigrated
        });
      } else {
        logTelemetryEventIfEnabled("tengu_auto_updater_fail", {
          fromVersion: currentVersion,
          attemptedVersion: latestVersion,
          status: updateStatus,
          durationMs: Date.now() - updateStartTime,
          wasMigrated
        });
      }

      // Notify parent of update result
      onAutoUpdaterResult({
        version: latestVersion,
        status: updateStatus
      });
    }
  }, [onAutoUpdaterResult, isUpdating, onChangeIsUpdating]);

  // Run checkAndUpdate on mount and when dependencies change
  _z1.useEffect(() => {
    checkAndUpdate();
  }, [checkAndUpdate]);

  // Set up periodic check every 30 minutes
  YC(checkAndUpdate, 1800000);

  // If no version info is available, render nothing
  if (!autoUpdaterResult?.version && (!versionInfo.global || !versionInfo.latest)) return null;
  if (!autoUpdaterResult?.version && !isUpdating) return null;

  // Render status UI
  return A5.createElement(g, {
    flexDirection: "row",
    gap: 1
  },
    // Verbose version info
    verbose && A5.createElement(_, { dimColor: true },
      "globalVersion: ", versionInfo.global, " · latestVersion: ", versionInfo.latest
    ),
    // Show updating message
    isUpdating ? (
      A5.createElement(A5.Fragment, null,
        A5.createElement(g, null,
          A5.createElement(_, {
            color: theme.secondaryText,
            dimColor: true,
            wrap: "end"
          },
            "Auto-updating to createRangeIterator", versionInfo.latest, "…"
          )
        )
      )
    ) : (
      // Show success message if update succeeded
      autoUpdaterResult?.status === "success" && autoUpdaterResult?.version && showSuccessMessage &&
      A5.createElement(_, { color: theme.success },
        "✓ Update installed · Restart to apply"
      )
    ),
    // Show error message if update failed
    (autoUpdaterResult?.status === "install_failed" || autoUpdaterResult?.status === "no_permissions") && (
      A5.createElement(_, { color: theme.error },
        "✗ Auto-update failed · Try ",
        A5.createElement(_, { bold: true }, "claude doctor"),
        !Fk() && A5.createElement(A5.Fragment, null,
          " or ",
          A5.createElement(_, { bold: true }, "npm i -g ", "@anthropic-ai/claude-code")
        ),
        Fk() && A5.createElement(A5.Fragment, null,
          " or ",
          A5.createElement(_, { bold: true }, "cd ~/.claude/local && npm update ", "@anthropic-ai/claude-code")
        )
      )
    )
  );
}

module.exports = AutoUpdateStatusAccessor;