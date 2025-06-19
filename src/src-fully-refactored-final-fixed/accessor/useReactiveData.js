/**
 * Custom React hook that subscribes to a shared observable (so1) and updates local state
 * whenever new data is emitted. The initial state is based on the 'ee' object.
 *
 * @returns {Object} The current state reflecting the latest data from the observable.
 */
function useReactiveData() {
  // Initialize local state with the contents of 'ee'
  const [reactiveData, setReactiveData] = HK1.useState({ ...ee });

  HK1.useEffect(() => {
    /**
     * Handler function to update local state when new data is emitted from the observable.
     * @param {Object} newData - The new data object emitted by the observable.
     */
    const handleObservableUpdate = (newData) => {
      setReactiveData({ ...newData });
    };

    // Subscribe to the observable
    so1.add(handleObservableUpdate);

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      so1.delete(handleObservableUpdate);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Return the current state
  return reactiveData;
}

module.exports = useReactiveData;