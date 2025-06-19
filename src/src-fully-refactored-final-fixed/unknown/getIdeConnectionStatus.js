/**
 * Determines the connection status of the 'ide' configuration from a list of observables.
 * Uses memoization to optimize performance by recalculating only when the sourceObservable changes.
 *
 * @param {Array<{ name: string, type: string }>} sourceObservable - Array of configuration objects to search for the 'ide' entry.
 * @returns {string|null} Returns 'connected' if the 'ide' config is present and its type is 'connected',
 *                        'disconnected' if present but not connected, or null if not found.
 */
function getIdeConnectionStatus(sourceObservable) {
  return ZS2.useMemo(() => {
    // Find the configuration object with name 'ide'
    const ideConfig = sourceObservable?.find(
      (subscription) => subscription.name === "ide"
    );

    // If 'ide' config is not found, return null
    if (!ideConfig) return null;

    // Return 'connected' if type is 'connected', otherwise 'disconnected'
    return ideConfig.type === "connected" ? "connected" : "disconnected";
  }, [sourceObservable]);
}

module.exports = getIdeConnectionStatus;
