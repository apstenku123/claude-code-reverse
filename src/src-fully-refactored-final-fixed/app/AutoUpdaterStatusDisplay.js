/**
 * Displays and manages the status of the auto-updater in the UI.
 * Handles update checks, displays current/latest versions, and shows success/failure messages.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isUpdating - Whether an update is currently in progress
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state
 * @param {function} props.onAutoUpdaterResult - Callback to report updater result ({version, status})
 * @param {Object} props.autoUpdaterResult - Result object from the auto-updater ({version, status})
 * @param {boolean} props.showSuccessMessage - Whether to show a success message when update is installed
 * @param {boolean} props.verbose - Whether to show current/latest version info
 * @returns {React.ReactElement|null} The UI element displaying updater status, or null if nothing to show
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

  // State for storing current and latest version info
  const [versionInfo, setVersionInfo] = jz1.useState({});

  // Ref to ensure the updater check runs only once on mount
  const hasCheckedForUpdate = i7.useRef(false);

  /**
   * Checks for updates and updates state/UI accordingly.
   * Wrapped in useCallback to avoid unnecessary re-creations.
   */
  const checkForUpdates = i7.useCallback(async () => {
    // Prevent duplicate update checks or if another update is in progress
    if (isUpdating || isAutoUpdaterDisabled()) return;
    onChangeIsUpdating(true);
    try {
      // Query the updater for latest version info
      const updaterResult = await checkAndUpdateToLatestVersion();
      // Hardcoded current version info
      const CURRENT_VERSION = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION;
      // Update state with current and latest version
      setVersionInfo({
        current: CURRENT_VERSION,
        latest: updaterResult.latestVersion
      });
      // If update was installed, log success and notify parent
      if (updaterResult.wasUpdated) {
        logTelemetryEventIfEnabled("tengu_native_auto_updater_success", {});
        onAutoUpdaterResult({
          version: updaterResult.latestVersion,
          status: "success"
        });
      }
    } catch (error) {
      // Log error and notify parent of failure
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      logTelemetryEventIfEnabled("tengu_native_auto_updater_fail", {});
      onAutoUpdaterResult({
        version: null,
        status: "install_failed"
      });
    } finally {
      onChangeIsUpdating(false);
    }
  }, [isUpdating, onChangeIsUpdating, onAutoUpdaterResult]);

  // On mount, run the update check once
  jz1.useEffect(() => {
    if (!hasCheckedForUpdate.current) {
      hasCheckedForUpdate.current = true;
      checkForUpdates();
    }
  }, [checkForUpdates]);

  // Set up periodic update checks every 30 minutes (1,800,000 ms)
  YC(checkForUpdates, 1800000);

  // If no version info is available and no update is in progress, render nothing
  if (!autoUpdaterResult?.version && (!versionInfo.current || !versionInfo.latest)) {
    return null;
  }
  if (!autoUpdaterResult?.version && !isUpdating) {
    return null;
  }

  // Render the updater status UI
  return i7.createElement(g, {
    flexDirection: "row",
    gap: 1
  },
    // Show current/latest version if verbose
    verbose && i7.createElement(_, { dimColor: true },
      "current: ", versionInfo.current, " · latest: ", versionInfo.latest
    ),
    // Show checking message if update is in progress
    isUpdating ? i7.createElement(g, null,
      i7.createElement(_, {
        color: theme.secondaryText,
        dimColor: true,
        wrap: "end"
      }, "Checking for updates")
    ) :
    // Show success message if update installed
    autoUpdaterResult?.status === "success" && autoUpdaterResult?.version && showSuccessMessage && i7.createElement(_, {
      color: theme.success
    }, "✓ Update installed · Restart to update"),
    // Show failure message if update failed
    autoUpdaterResult?.status === "install_failed" && i7.createElement(_, {
      color: theme.error
    }, "✗ Auto-update failed · Try ", i7.createElement(_, { bold: true }, "/status"))
  );
}

module.exports = AutoUpdaterStatusDisplay;