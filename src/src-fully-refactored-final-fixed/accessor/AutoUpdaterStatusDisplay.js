/**
 * AutoUpdaterStatusDisplay
 *
 * Displays the status and UI for the auto-updater, including version info, update progress, and error/success messages.
 * Handles checking for updates, triggering the auto-update process, and reporting results.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isUpdating - Whether an update is currently in progress
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state
 * @param {function} props.onAutoUpdaterResult - Callback to report the result of the auto-update
 * @param {Object} props.autoUpdaterResult - Result object from the auto-updater ({ version, status })
 * @param {boolean} props.showSuccessMessage - Whether to show a success message after update
 * @param {boolean} props.verbose - Whether to show verbose version info
 * @returns {React.ReactNode|null} The UI elements for the auto-updater status, or null if not applicable
 */
function AutoUpdaterStatusDisplay({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // State for holding version info
  const [versionInfo, setVersionInfo] = _z1.useState({});

  /**
   * Checks for updates and triggers the auto-update process if needed.
   * Memoized to avoid unnecessary re-runs.
   */
  const checkAndUpdate = A5.useCallback(async () => {
    const config = getCachedOrFreshConfig();
    // Don'processRuleBeginHandlers run if already updating
    if (isUpdating) return;

    // Static package info
    const PACKAGE_INFO = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    };
    const currentVersion = PACKAGE_INFO.VERSION;

    // Get latest version from remote
    const latestVersion = await Qz1();
    // Check if running in local/dev mode
    const isLocalMode = isAutoUpdaterDisabled();

    // Update state with version info
    setVersionInfo({
      global: currentVersion,
      latest: latestVersion
    });

    // If not local, and both versions exist, and current is less than latest, trigger update
    if (!isLocalMode && currentVersion && latestVersion && !tP2.gte(currentVersion, latestVersion)) {
      const updateStartTime = Date.now();
      onChangeIsUpdating(true);

      // Determine if migration is needed
      let updateStatus;
      const wasMigrated = config.autoUpdaterStatus === "migrated";
      if (wasMigrated) {
        updateStatus = await installClaudeCliPackage();
      } else {
        updateStatus = await performAutoUpdate();
      }
      onChangeIsUpdating(false);

      // Report analytics event
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

      // Notify parent of result
      onAutoUpdaterResult({
        version: latestVersion,
        status: updateStatus
      });
    }
  }, [isUpdating, onChangeIsUpdating, onAutoUpdaterResult]);

  // Run checkAndUpdate on mount and when dependencies change
  _z1.useEffect(() => {
    checkAndUpdate();
  }, [checkAndUpdate]);

  // Run checkAndUpdate every 30 minutes
  YC(checkAndUpdate, 1800000);

  // If handleMissingDoctypeError don'processRuleBeginHandlers have version info yet, don'processRuleBeginHandlers render anything
  if (!autoUpdaterResult?.version && (!versionInfo.global || !versionInfo.latest)) return null;
  // If not updating and no result, don'processRuleBeginHandlers render
  if (!autoUpdaterResult?.version && !isUpdating) return null;

  // Render UI
  return A5.createElement(g, {
    flexDirection: "row",
    gap: 1
  },
    // Verbose version info
    verbose && A5.createElement(_, {
      dimColor: true
    },
      "globalVersion: ", versionInfo.global, " · latestVersion:", " ", versionInfo.latest
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
      autoUpdaterResult?.status === "success" && autoUpdaterResult?.version && showSuccessMessage && (
        A5.createElement(_, {
          color: theme.success
        },
          "✓ Update installed · Restart to apply"
        )
      )
    ),
    // Show error message if update failed or no permissions
    (autoUpdaterResult?.status === "install_failed" || autoUpdaterResult?.status === "no_permissions") && (
      A5.createElement(_, {
        color: theme.error
      },
        "✗ Auto-update failed · Try ",
        A5.createElement(_, {
          bold: true
        }, "claude doctor"),
        !Fk() && (
          A5.createElement(A5.Fragment, null,
            " ",
            "or ",
            A5.createElement(_, {
              bold: true
            },
              "npm i -g ", "@anthropic-ai/claude-code"
            )
          )
        ),
        Fk() && (
          A5.createElement(A5.Fragment, null,
            " ",
            "or",
            " ",
            A5.createElement(_, {
              bold: true
            },
              "cd ~/.claude/local && npm update ", "@anthropic-ai/claude-code"
            )
          )
        )
      )
    )
  );
}

module.exports = AutoUpdaterStatusDisplay;