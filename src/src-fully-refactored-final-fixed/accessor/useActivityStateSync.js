/**
 * Custom React hook that synchronizes component state with an external activity event source.
 *
 * Initializes state with the default activity state and subscribes to activity updates.
 * When an activity update occurs, the state is updated accordingly. The subscription is
 * cleaned up automatically when the component unmounts.
 *
 * @returns {Object} The current activity state.
 */
function useActivityStateSync() {
  // Initialize state with the default activity state (spread from ee)
  const [activityState, setActivityState] = HK1.useState({
    ...ee
  });

  // Subscribe to activity updates on mount, and clean up on unmount
  HK1.useEffect(() => {
    /**
     * Handler for activity updates. Updates the local state with the new activity state.
     * @param {Object} updatedActivityState - The new activity state to set.
     */
    const handleActivityUpdate = (updatedActivityState) => {
      setActivityState({
        ...updatedActivityState
      });
    };

    // Add the handler to the external activity event source
    so1.add(handleActivityUpdate);

    // Cleanup: remove the handler when the component unmounts
    return () => {
      so1.delete(handleActivityUpdate);
    };
  }, []);

  // Return the current activity state
  return activityState;
}

module.exports = useActivityStateSync;