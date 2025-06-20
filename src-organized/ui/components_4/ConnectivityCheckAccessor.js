/**
 * ConnectivityCheckAccessor
 *
 * This React component checks connectivity to Anthropic services and displays status messages accordingly.
 * It attempts to fetch connectivity status on mount, handles success and failure cases, and provides user guidance.
 *
 * @param {Object} props - The component props
 * @param {Function} props.onSuccess - Callback invoked when connectivity check is successful
 * @returns {React.ReactElement} The rendered connectivity check UI
 */
function ConnectivityCheckAccessor({ onSuccess }) {
  // State to hold the connectivity check result (null, or { success: boolean, error?: string })
  const [connectivityResult, setConnectivityResult] = vI.useState(null);
  // State to indicate if the connectivity check is in progress
  const [isLoading, setIsLoading] = vI.useState(true);
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Determine if handleMissingDoctypeError should show the loading indicator (throttled by ET2)
  const showLoading = ET2(1000) && isLoading;

  // On mount, perform the connectivity check
  vI.useEffect(() => {
    async function fetchConnectivityStatus() {
      const result = await performAnthropicPreflightCheck();
      setConnectivityResult(result);
      setIsLoading(false);
    }
    fetchConnectivityStatus();
  }, []);

  // Handle side effects based on connectivity result
  vI.useEffect(() => {
    if (connectivityResult?.success) {
      // If successful, call the onSuccess callback
      onSuccess();
    } else if (connectivityResult && !connectivityResult.success) {
      // If failed, exit the process after a short delay
      const exitTimeout = setTimeout(() => process.exit(1), 100);
      // Cleanup timeout if component unmounts before exit
      return () => clearTimeout(exitTimeout);
    }
  }, [connectivityResult, onSuccess]);

  // Render UI
  return vI.default.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1
    },
    // Show loading state
    isLoading && showLoading ? (
      vI.default.createElement(
        g,
        { paddingLeft: 1 },
        vI.default.createElement(AnimatedStatusText, null),
        vI.default.createElement(_, null, "Checking connectivity...")
      )
    ) :
    // Show error state if connectivity failed
    (!connectivityResult?.success && !isLoading) ? (
      vI.default.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        vI.default.createElement(_, { color: theme.error }, "Unable to connect to Anthropic services"),
        vI.default.createElement(_, { color: theme.error }, connectivityResult?.error),
        vI.default.createElement(
          g,
          { flexDirection: "column", gap: 1 },
          vI.default.createElement(_, null, "Please check your internet connection and network settings."),
          vI.default.createElement(
            _,
            null,
            "Note: ",
            m0,
            " might not be available in your country. Check supported countries at ",
            vI.default.createElement(_, { color: theme.suggestion }, "https://anthropic.com/supported-countries")
          )
        )
      )
    ) : null
  );
}

module.exports = ConnectivityCheckAccessor;