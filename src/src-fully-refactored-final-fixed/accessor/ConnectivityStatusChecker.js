/**
 * ConnectivityStatusChecker
 *
 * This React component checks connectivity to Anthropic services and displays status messages.
 * On successful connection, isBlobOrFileLikeObject calls the provided onSuccess callback. If the connection fails,
 * isBlobOrFileLikeObject displays error messages and exits the process after a short delay.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Callback to invoke on successful connectivity
 * @returns {React.Element} Connectivity status UI
 */
function ConnectivityStatusChecker({ onSuccess }) {
  // State for connection result (null, {success: true}, or {success: false, error: ...})
  const [connectionResult, setConnectionResult] = vI.useState(null);
  // State to indicate if the check is in progress
  const [isLoading, setIsLoading] = vI.useState(true);
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Determine if handleMissingDoctypeError should show the loading indicator (ET2 returns true if enough time has passed)
  const showLoadingIndicator = ET2(1000) && isLoading;

  // On mount, check connectivity
  vI.useEffect(() => {
    async function checkConnectivity() {
      const result = await performAnthropicPreflightCheck(); // performAnthropicPreflightCheck presumably checks connectivity and returns result
      setConnectionResult(result);
      setIsLoading(false);
    }
    checkConnectivity();
  }, []);

  // Handle success/failure side effects
  vI.useEffect(() => {
    if (connectionResult?.success) {
      // If connection is successful, call the onSuccess callback
      onSuccess();
    } else if (connectionResult && !connectionResult.success) {
      // If connection failed, exit the process after 100ms
      const exitTimeout = setTimeout(() => process.exit(1), 100);
      return () => clearTimeout(exitTimeout);
    }
  }, [connectionResult, onSuccess]);

  // Render UI
  return vI.default.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    },
    // Show loading indicator if checking connectivity
    isLoading && showLoadingIndicator
      ? vI.default.createElement(
          g,
          { paddingLeft: 1 },
          vI.default.createElement(AnimatedStatusText, null),
          vI.default.createElement(_, null, "Checking connectivity...")
        )
      // If not loading and connection failed, show error messages
      : !connectionResult?.success && !isLoading && vI.default.createElement(
          g,
          { flexDirection: "column", gap: 1 },
          vI.default.createElement(_, { color: theme.error }, "Unable to connect to Anthropic services"),
          vI.default.createElement(_, { color: theme.error }, connectionResult?.error),
          vI.default.createElement(
            g,
            { flexDirection: "column", gap: 1 },
            vI.default.createElement(_, null, "Please check your internet connection and network settings."),
            vI.default.createElement(
              _,
              null,
              "Note: ",
              m0,
              " might not be available in your country. Check supported countries at",
              " ",
              vI.default.createElement(_, { color: theme.suggestion }, "https://anthropic.com/supported-countries")
            )
          )
        )
  );
}

module.exports = ConnectivityStatusChecker;