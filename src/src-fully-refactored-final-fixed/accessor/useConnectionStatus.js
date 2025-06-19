/**
 * Custom React hook that periodically checks and updates the connection status.
 *
 * @param {number} [pollingInterval] - Optional polling interval in milliseconds. If not provided,
 *   defaults to 30,000ms if rh() returns true, otherwise 1,000ms.
 * @returns {{ isConnected: boolean|null }} An object containing the current connection status.
 */
function useConnectionStatus(pollingInterval) {
  // Determine the default polling interval based on the result of rh()
  const defaultInterval = rh() ? 30000 : 1000;
  // Use the provided pollingInterval or fallback to the default
  const effectiveInterval = pollingInterval ?? defaultInterval;

  // React state to store the connection status
  const [isConnected, setIsConnected] = Fz1.useState(null);

  Fz1.useEffect(() => {
    // Flag to prevent state updates after unmount
    let isActive = true;

    // Prevent nonessential traffic if the environment variable is set
    if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;

    // Function to fetch and update the connection status
    const updateConnectionStatus = async () => {
      if (!isActive) return;
      const connectionStatus = await PH5();
      if (isActive) setIsConnected(connectionStatus);
    };

    // Initial fetch
    updateConnectionStatus();
    // Set up polling interval
    const intervalId = setInterval(updateConnectionStatus, effectiveInterval);

    // Cleanup function to clear interval and prevent state updates
    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [effectiveInterval]);

  return {
    isConnected
  };
}

module.exports = useConnectionStatus;