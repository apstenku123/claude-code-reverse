/**
 * Displays the current IDE connection and selection status, including error and hint messages.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.ideSelection - Current IDE selection (may include filePath, text, lineCount).
 * @param {Object} props.mcpClients - MCP client connection info.
 * @param {Object} props.ideInstallationStatus - IDE installation status (may include error).
 * @returns {React.ReactElement} The status indicator React element.
 */
function IdeStatusIndicator({
  ideSelection,
  mcpClients,
  ideInstallationStatus
}) {
  // Theme colors/styles
  const theme = getThemeStylesheet();
  // IDE connection status: "connected", "disconnected", or null
  const ideConnectionStatus = kz1(mcpClients);

  // Show "IDE connected" indicator
  const [showConnectedIndicator, setShowConnectedIndicator] = iO.useState(true);
  // Show hint to use /ide command
  const [showIdeCommandHint, setShowIdeCommandHint] = iO.useState(false);

  // Show/hide "IDE connected" indicator for 1s after connecting
  iO.useEffect(() => {
    if (ideConnectionStatus === "connected") {
      const timeoutId = setTimeout(() => {
        setShowConnectedIndicator(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (ideConnectionStatus === "disconnected") {
      setShowConnectedIndicator(true);
    }
  }, [ideConnectionStatus]);

  // Show/hide error message for 5s if installation error occurs
  const [showInstallError, setShowInstallError] = iO.useState(false);
  iO.useEffect(() => {
    if (ideInstallationStatus?.error || kZ) {
      setShowInstallError(true);
      const timeoutId = setTimeout(() => {
        setShowInstallError(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [ideInstallationStatus?.error]);

  // Selection status logic
  const hasSelection = ideConnectionStatus === "connected" && (
    ideSelection?.filePath || (ideSelection?.text && ideSelection.lineCount > 0)
  );
  const connectedNoSelection = ideConnectionStatus === "connected" && !hasSelection;
  const showInstallErrorOnly = showInstallError && !kZ && !connectedNoSelection && !hasSelection;
  const showPluginNotConnected = showInstallError && kZ && !connectedNoSelection && !hasSelection;

  // Show hint to use /ide command for 3s if not connected and not previously shown
  iO.useEffect(() => {
    if (!qw() && ideConnectionStatus === null && !DS2) {
      let timeoutId;
      getAvailableIdeConnections(true).then(result => {
        if (result.length > 0) {
          setShowIdeCommandHint(true);
          timeoutId = setTimeout(() => {
            setShowIdeCommandHint(false);
          }, 3000);
          DS2 = true;
        }
      });
      return () => timeoutId && clearTimeout(timeoutId);
    }
  }, [ideConnectionStatus]);

  // Render status indicators based on current state
  if (ideConnectionStatus !== null) {
    return FB.createElement(
      FB.Fragment,
      null,
      // IDE disconnected
      !showInstallErrorOnly && ideConnectionStatus === "disconnected" &&
        FB.createElement(_, {
          color: theme.error,
          key: "ide-status"
        }, y0.circle, " IDE disconnected"),
      // IDE connected
      connectedNoSelection &&
        FB.createElement(_, {
          color: theme.success,
          key: "ide-status"
        }, y0.circle, showConnectedIndicator && " IDE connected"),
      // IDE extension install failed
      showInstallErrorOnly &&
        FB.createElement(_, {
          color: theme.error
        }, "IDE extension install failed (see /status for info)"),
      // IDE plugin not connected
      showPluginNotConnected &&
        FB.createElement(_, {
          color: theme.secondaryText
        }, "IDE plugin not connected (see /status for info)"),
      // Selection indicators
      hasSelection && ideSelection?.text && ideSelection.lineCount > 0 ?
        FB.createElement(_, {
          color: theme.permission,
          key: "selection-indicator"
        }, "⧉ ", ideSelection.lineCount, " ", ideSelection.lineCount === 1 ? "line" : "lines", " selected") :
      hasSelection && ideSelection?.filePath ?
        FB.createElement(_, {
          color: theme.permission,
          key: "selection-indicator"
        }, "⧉ In ", Nw5(ideSelection.filePath)) :
      null
    );
  } else {
    // Not connected: show hint or plugin not connected
    return FB.createElement(
      FB.Fragment,
      null,
      showIdeCommandHint && !showPluginNotConnected &&
        FB.createElement(_, {
          color: theme.secondaryText,
          key: "ide-command-hint"
        }, y0.circle, " Use /ide to connect to your IDE"),
      showPluginNotConnected &&
        FB.createElement(_, {
          color: theme.secondaryText
        }, "IDE plugin not connected (see /status for info)")
    );
  }
}

module.exports = IdeStatusIndicator;