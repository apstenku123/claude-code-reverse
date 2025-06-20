/**
 * AutoUpdaterStatusAccessor
 *
 * This React component manages and displays the status of the auto-updater process for the Claude Code package.
 * It checks for updates, triggers the auto-update process if needed, and renders status messages to the user.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isUpdating - Whether an update is currently in progress
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state
 * @param {function} props.onAutoUpdaterResult - Callback to report the result of the auto-update
 * @param {Object} props.autoUpdaterResult - The result object from the auto-updater (status, version)
 * @param {boolean} props.showSuccessMessage - Whether to show a success message when update is installed
 * @param {boolean} props.verbose - Whether to show verbose output
 * @returns {React.ReactNode|null} The rendered status UI, or null if nothing should be shown
 */
function AutoUpdaterStatusAccessor({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // State to hold version information
  const [versionInfo, setVersionInfo] = _z1.useState({});

  /**
   * Checks for updates and triggers the auto-update process if needed.
   */
  const checkAndUpdate = A5.useCallback(async () => {
    const config = getCachedOrFreshConfig();
    if (isUpdating) return;

    // Static package info
    const PACKAGE_INFO = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    };
    const currentVersion = PACKAGE_INFO.VERSION;

    // Fetch latest version from remote
    const latestVersion = await Qz1();
    // Check if running in a restricted environment
    const isRestricted = isAutoUpdaterDisabled();

    // Update version info state
    setVersionInfo({
      global: currentVersion,
      latest: latestVersion
    });

    // Only proceed if not restricted, and a newer version is available
    if (!isRestricted && currentVersion && latestVersion && !tP2.gte(currentVersion, latestVersion)) {
      const updateStartTime = Date.now();
      onChangeIsUpdating(true);
      let updateStatus;
      // Determine if migration is needed
      const wasMigrated = config.autoUpdaterStatus === "migrated";
      if (wasMigrated) {
        updateStatus = await installClaudeCliPackage();
      } else {
        updateStatus = await performAutoUpdate();
      }
      onChangeIsUpdating(false);

      // Log update result
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
      // Report result to parent
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

  // If no version info and no result, render nothing
  if (!autoUpdaterResult?.version && (!versionInfo.global || !versionInfo.latest)) {
    return null;
  }
  // If not updating and no result, render nothing
  if (!autoUpdaterResult?.version && !isUpdating) {
    return null;
  }

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
      // Show success message
      autoUpdaterResult?.status === "success" && autoUpdaterResult?.version && showSuccessMessage ? (
        A5.createElement(_, { color: theme.success },
          "✓ Update installed · Restart to apply"
        )
      ) : (
        // Show failure message
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
      )
    )
  );
}

module.exports = AutoUpdaterStatusAccessor;