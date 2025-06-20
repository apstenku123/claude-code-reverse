/**
 * Custom React hook to manage and provide the current list of shells and a method to kill a shell.
 *
 * This hook subscribes to shell updates and ensures the component always has the latest shell list.
 * It also provides a convenient method to kill a shell by its updateSnapshotAndNotify.
 *
 * @returns {Object} An object containing:
 *   - shells: Array of current shell objects
 *   - killShell: Function to kill a shell by its updateSnapshotAndNotify
 */
function useShellsState() {
  // State to store the current list of shells
  const [shells, setShells] = au.useState([]);

  // Callback to update the shells state with the latest shells
  const updateShells = au.useCallback(() => {
    setShells(aw.getAllShells());
  }, []);

  // Effect to subscribe to shell updates and clean up on unmount
  au.useEffect(() => {
    // Initial fetch of shells
    updateShells();

    // Subscribe to shell updates and update state when they occur
    const unsubscribe = aw.subscribe(() => {
      updateShells();
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [updateShells]);

  // Return the shells and a function to kill a shell by updateSnapshotAndNotify
  return {
    shells,
    killShell: (shellId) => aw.killShell(shellId)
  };
}

module.exports = useShellsState;