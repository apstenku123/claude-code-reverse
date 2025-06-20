/**
 * ConnectivityChecker component
 *
 * This React component checks connectivity to Anthropic services and handles UI feedback for success or failure.
 * It triggers a callback on successful connection, and exits the process on failure after a short delay.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Callback function to invoke on successful connectivity
 * @returns {JSX.Element} The rendered connectivity checking UI
 */
function ConnectivityChecker({ onSuccess }) {
  // State to hold the connectivity result (null, or { success: boolean, error?: string })
  const [connectivityResult, setConnectivityResult] = vI.useState(null);
  // State to indicate if the connectivity check is in progress
  const [isLoading, setIsLoading] = vI.useState(true);
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Determine if the connectivity check should be shown (debounced by ET2)
  const shouldShowLoading = ET2(1000) && isLoading;

  // Effect: Run connectivity check on mount
  vI.useEffect(() => {
    async function checkConnectivity() {
      // Await the connectivity check result
      const result = await performAnthropicPreflightCheck();
      setConnectivityResult(result);
      setIsLoading(false);
    }
    checkConnectivity();
  }, []);

  // Effect: Handle result of connectivity check
  vI.useEffect(() => {
    if (connectivityResult?.success) {
      // If successful, invoke the onSuccess callback
      onSuccess();
    } else if (connectivityResult && !connectivityResult.success) {
      // If failed, exit the process after a short delay
      const exitTimeout = setTimeout(() => process.exit(1), 100);
      // Cleanup timeout if component unmounts before exit
      return () => clearTimeout(exitTimeout);
    }
  }, [connectivityResult, onSuccess]);

  // Render loading state
  if (isLoading && shouldShowLoading) {
    return vI.default.createElement(
      g,
      { flexDirection: "column", gap: 1, paddingLeft: 1 },
      vI.default.createElement(
        g,
        { paddingLeft: 1 },
        vI.default.createElement(AnimatedStatusText, null),
        vI.default.createElement(_, null, "Checking connectivity...")
      )
    );
  }

  // Render error state if connectivity failed
  if (!connectivityResult?.success && !isLoading) {
    return vI.default.createElement(
      g,
      { flexDirection: "column", gap: 1 },
      vI.default.createElement(
        _,
        { color: theme.error },
        "Unable to connect to Anthropic services"
      ),
      vI.default.createElement(
        _,
        { color: theme.error },
        connectivityResult?.error
      ),
      vI.default.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        vI.default.createElement(
          _,
          null,
          "Please check your internet connection and network settings."
        ),
        vI.default.createElement(
          _,
          null,
          "Note: ",
          m0,
          " might not be available in your country. Check supported countries at",
          " ",
          vI.default.createElement(
            _,
            { color: theme.suggestion },
            "https://anthropic.com/supported-countries"
          )
        )
      )
    );
  }

  // If successful, render nothing (or could render a success message if desired)
  return null;
}

module.exports = ConnectivityChecker;