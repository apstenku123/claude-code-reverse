/**
 * Custom React hook that manages and subscribes to route data updates.
 * Initializes state with default route data, subscribes to updates via an external event emitter,
 * and cleans up the subscription on unmount.
 *
 * @returns {Object} The current route data state.
 */
function useRouteData() {
  // Initialize state with the default route data (spread from ee)
  const [routeData, setRouteData] = HK1.useState({
    ...ee
  });

  // Subscribe to route data updates on mount, and clean up on unmount
  HK1.useEffect(() => {
    /**
     * Handler for route data updates. Updates state with the new data.
     * @param {Object} updatedData - The new route data to set.
     */
    const handleRouteDataUpdate = (updatedData) => {
      setRouteData({
        ...updatedData
      });
    };

    // Add the handler to the external event emitter (so1)
    so1.add(handleRouteDataUpdate);

    // Cleanup: remove the handler when the component unmounts
    return () => {
      so1.delete(handleRouteDataUpdate);
    };
  }, []);

  // Return the current route data
  return routeData;
}

module.exports = useRouteData;
