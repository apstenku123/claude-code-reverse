/**
 * Displays and manages the auto-updater status panel in the UI.
 * Handles checking for updates, updating state, and displaying success or error messages.
 *
 * @param {Object} props - Component properties
 * @param {boolean} props.isUpdating - Whether an update check is currently in progress
 * @param {function} props.onChangeIsUpdating - Callback to set the updating state
 * @param {function} props.onAutoUpdaterResult - Callback to report the result of an update attempt
 * @param {Object} props.autoUpdaterResult - Result object from the auto-updater (may include version and status)
 * @param {boolean} props.showSuccessMessage - Whether to show a success message after update
 * @param {boolean} props.verbose - Whether to display verbose version info
 * @returns {React.ReactNode|null} The rendered status panel or null if not applicable
 */
function AutoUpdaterStatusPanel({
  isUpdating,
  onChangeIsUpdating,
  onAutoUpdaterResult,
  autoUpdaterResult,
  showSuccessMessage,
  verbose
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Track current and latest version info
  const [versionInfo, setVersionInfo] = jz1.useState({});

  // Ref to ensure update check runs only once on mount
  const hasCheckedForUpdates = i7.useRef(false);

  /**
   * Checks for updates and updates state/UI accordingly.
   * Uses callbacks to notify parent of update status.
   */
  const checkForUpdates = i7.useCallback(async () => {
    // Prevent duplicate update checks or if update is already in progress
    if (isUpdating || isAutoUpdaterDisabled()) return;
    onChangeIsUpdating(true);
    try {
      // Call the updater and get latest version info
      const updaterResult = await checkAndUpdateToLatestVersion();
      // Hardcoded current version info
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
      // If an update was performed, report success
      if (updaterResult.wasUpdated) {
        logTelemetryEventIfEnabled("tengu_native_auto_updater_success", {});
        onAutoUpdaterResult({
          version: updaterResult.latestVersion,
          status: "success"
        });
      }
    } catch (error) {
      // Log and report failure
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

  // On mount, check for updates once
  jz1.useEffect(() => {
    if (!hasCheckedForUpdates.current) {
      hasCheckedForUpdates.current = true;
      checkForUpdates();
    }
  }, [checkForUpdates]);

  // Periodically check for updates every 30 minutes
  YC(checkForUpdates, 1800000);

  // If no version info is available, render nothing
  if (!autoUpdaterResult?.version && (!versionInfo.current || !versionInfo.latest)) {
    return null;
  }
  // If not updating and no version info, render nothing
  if (!autoUpdaterResult?.version && !isUpdating) {
    return null;
  }

  // Render the status panel
  return i7.createElement(
    g,
    {
      flexDirection: "row",
      gap: 1
    },
    // Verbose mode: show current and latest version
    verbose && i7.createElement(
      _,
      { dimColor: true },
      "current: ", versionInfo.current, " · latest: ", versionInfo.latest
    ),
    // If updating, show checking message
    isUpdating ? i7.createElement(
      g,
      null,
      i7.createElement(
        _,
        {
          color: theme.secondaryText,
          dimColor: true,
          wrap: "end"
        },
        "Checking for updates"
      )
    ) :
    // If update succeeded, show success message
    autoUpdaterResult?.status === "success" && autoUpdaterResult?.version && showSuccessMessage && i7.createElement(
      _,
      { color: theme.success },
      "✓ Update installed · Restart to update"
    ),
    // If update failed, show error message
    autoUpdaterResult?.status === "install_failed" && i7.createElement(
      _,
      { color: theme.error },
      "✗ Auto-update failed · Try ",
      i7.createElement(_, { bold: true }, "/status")
    )
  );
}

module.exports = AutoUpdaterStatusPanel;