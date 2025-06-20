/**
 * Renders the status and updater panel for the application, displaying API key status,
 * usage warnings, debug mode, token usage, and auto-updater controls.
 *
 * @param {Object} props - The properties object.
 * @param {('valid'|'invalid'|'missing')} props.apiKeyStatus - The current API key status.
 * @param {Object} props.autoUpdaterResult - The result object from the auto-updater process.
 * @param {boolean} props.debug - Whether debug mode is enabled.
 * @param {boolean} props.isAutoUpdating - Whether the auto-updater is currently running.
 * @param {boolean} props.verbose - Whether verbose mode is enabled.
 * @param {number} props.tokenUsage - The current token usage count.
 * @param {string} props.permissionMode - The current permission mode.
 * @param {Function} props.onAutoUpdaterResult - Callback for auto-updater result changes.
 * @param {Function} props.onChangeIsUpdating - Callback for toggling auto-updating.
 * @param {Object} props.ideSelection - The current IDE selection object.
 * @param {Object} props.ideInstallationStatus - The IDE installation status object.
 * @param {Object} props.mcpClients - The MCP clients object.
 * @returns {React.ReactElement} The rendered status and updater panel.
 */
function StatusAndUpdaterPanel({
  apiKeyStatus,
  autoUpdaterResult,
  debug,
  isAutoUpdating,
  verbose,
  tokenUsage,
  permissionMode,
  onAutoUpdaterResult,
  onChangeIsUpdating,
  ideSelection,
  ideInstallationStatus,
  mcpClients
}) {
  // Get permission warning message if any
  const permissionWarningMessage = createRefCountedMulticastOperator$2(permissionMode);
  // Get whether to show success message for auto-updater
  const showSuccessMessage = GS2(tokenUsage);
  // Get MCP client connection status
  const mcpConnectionStatus = kz1(mcpClients);
  // Get main loop model from state
  const [{ mainLoopModel }] = useAppState();
  // Get API rate limit status and related info
  const {
    status: apiRateLimitStatus,
    resetsAt: apiRateLimitResetsAt,
    unifiedRateLimitFallbackAvailable
  } = useReactiveData();
  // Determine if the auto-updater panel should be shown
  const shouldShowAutoUpdaterPanel =
    !(mcpConnectionStatus === "connected" &&
      (ideSelection?.filePath || (ideSelection?.text && ideSelection.lineCount > 0))) ||
    isAutoUpdating ||
    autoUpdaterResult?.status !== "success";
  // Format the API rate limit reset time, if available
  const formattedResetTime = formatUnixTimestampToTimeString(apiRateLimitResetsAt);

  return I6.createElement(
    bAA,
    null,
    I6.createElement(
      g,
      { flexDirection: "column", alignItems: "flex-end" },
      // IDE status panel
      I6.createElement(IdeStatusIndicator, {
        ideSelection,
        mcpClients,
        ideInstallationStatus
      }),
      // Show Opus usage warning if fallback is available and model is opus
      unifiedRateLimitFallbackAvailable &&
        mainLoopModel === "opus" &&
        apiRateLimitStatus !== "allowed_warning" &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().warning },
            "Approaching Opus usage limit \u00B7 /model to use best available model"
          )
        ),
      // Show general usage warning if approaching usage limit
      apiRateLimitStatus === "allowed_warning" &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().warning },
            "Approaching usage limit",
            formattedResetTime && ` \u00B7 resets at ${formattedResetTime}`
          )
        ),
      // Show invalid API key error
      apiKeyStatus === "invalid" &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().error },
            "Invalid API key \u00B7 Run /login"
          )
        ),
      // Show missing API key error
      apiKeyStatus === "missing" &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().error },
            "Missing API key \u00B7 Run /login"
          )
        ),
      // Show debug mode warning
      debug &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().warning },
            "Debug mode"
          )
        ),
      // Show permission warning if present and API key is valid
      apiKeyStatus !== "invalid" &&
        apiKeyStatus !== "missing" &&
        permissionWarningMessage &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { color: getThemeStylesheet().warning },
            permissionWarningMessage
          )
        ),
      // Show token usage if no permission warning and verbose mode is on
      apiKeyStatus !== "invalid" &&
        apiKeyStatus !== "missing" &&
        !permissionWarningMessage &&
        verbose &&
        I6.createElement(
          g,
          null,
          I6.createElement(
            _,
            { dimColor: true },
            tokenUsage,
            " tokens"
          )
        ),
      // Always show token usage summary
      I6.createElement(renderContextUsageWarning, { tokenUsage }),
      // Show auto-updater panel if needed
      shouldShowAutoUpdaterPanel &&
        I6.createElement(AutoUpdaterComponentLoader, {
          verbose,
          onAutoUpdaterResult,
          autoUpdaterResult,
          isUpdating: isAutoUpdating,
          onChangeIsUpdating,
          showSuccessMessage: !showSuccessMessage
        })
    )
  );
}

module.exports = StatusAndUpdaterPanel;
