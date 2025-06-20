/**
 * Custom React hook that subscribes to the so1 observable and updates local state when so1 emits new values.
 *
 * @returns {Object} The current state synchronized with so1.
 */
function useSo1State() {
  // Initialize local state with a shallow copy of the default state (ee)
  const [so1State, setSo1State] = HK1.useState({
    ...ee
  });

  HK1.useEffect(() => {
    /**
     * Handler function to update local state when so1 emits a new value.
     * @param {Object} newState - The new state emitted by so1.
     */
    const handleSo1Update = (newState) => {
      setSo1State({
        ...newState
      });
    };

    // Subscribe to so1 updates
    so1.add(handleSo1Update);

    // Cleanup subscription on unmount
    return () => {
      so1.delete(handleSo1Update);
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Return the current so1 state
  return so1State;
}

module.exports = useSo1State;