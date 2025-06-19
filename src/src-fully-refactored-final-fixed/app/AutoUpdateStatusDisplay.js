/**
 * Displays and manages the auto-update status UI for the application.
 * Handles checking for updates, updating state, and rendering status messages.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isUpdating - Whether the updater is currently running.
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state.
 * @param {function} props.onAutoUpdaterResult - Callback to handle the result of the auto-updater.
 * @param {Object} props.autoUpdaterResult - The result object from the auto-updater (may include version and status).
 * @param {boolean} props.showSuccessMessage - Whether to show a success message when update is installed.
 * @param {boolean} props.verbose - Whether to show verbose status info (current/latest versions).
 * @returns {React.ReactNode|null} The rendered status UI, or null if not applicable.
 */
function AutoUpdateStatusDisplay({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // State to track current and latest version
  const [versionInfo, setVersionInfo] = jz1.useState({});

  // Ref to ensure update check runs only once on mount
  const hasCheckedForUpdate = i7.useRef(false);

  /**
   * Checks for updates and updates state/UI accordingly.
   * Uses callbacks to notify parent of update status.
   */
  const checkForUpdates = i7.useCallback(async () => {
    // Prevent duplicate update checks or if another update is in progress
    if (isUpdating || isAutoUpdaterDisabled()) return;
    onChangeIsUpdating(true);
    try {
      // Call the updater and get latest version info
      const updaterResult = await checkAndUpdateToLatestVersion();
      // Hardcoded version info (could be replaced with dynamic versioning)
      const CURRENT_VERSION = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION;
      // Update local state with current and latest version
      setVersionInfo({
        current: CURRENT_VERSION,
        latest: updaterResult.latestVersion
      });
      // If update was applied, log success and notify parent
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

  // On mount, check for updates only once
  jz1.useEffect(() => {
    if (!hasCheckedForUpdate.current) {
      hasCheckedForUpdate.current = true;
      checkForUpdates();
    }
  }, [checkForUpdates]);

  // Set up periodic update checks every 30 minutes (1,800,000 ms)
  YC(checkForUpdates, 1800000);

  // If no version info and no update result, render nothing
  if (!autoUpdaterResult?.version && (!versionInfo.current || !versionInfo.latest)) {
    return null;
  }
  // If not updating and no version info, render nothing
  if (!autoUpdaterResult?.version && !isUpdating) {
    return null;
  }

  // Render UI based on update status
  return i7.createElement(g, {
    flexDirection: "row",
    gap: 1
  },
    // Show current/latest version if verbose
    verbose && i7.createElement(_, { dimColor: true }, "current: ", versionInfo.current, " · latest: ", versionInfo.latest),
    // Show loading message if updating
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
    // Show error message if update failed
    autoUpdaterResult?.status === "install_failed" && i7.createElement(_, {
      color: theme.error
    }, "✗ Auto-update failed · Try ", i7.createElement(_, { bold: true }, "/status"))
  );
}

module.exports = AutoUpdateStatusDisplay;