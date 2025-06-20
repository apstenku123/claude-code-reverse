/**
 * Manages the state of shell processes and provides utilities to interact with them.
 *
 * This custom React hook maintains an up-to-date list of all shell processes and exposes
 * a method to terminate a shell by its updateSnapshotAndNotify. It subscribes to shell updates and ensures
 * the state is refreshed whenever shells change.
 *
 * @returns {Object} An object containing the current list of shells and a function to kill a shell.
 * @property {Array} shells - The current list of shell processes.
 * @property {Function} killShell - Function to terminate a shell by its updateSnapshotAndNotify.
 */
function useShellManager() {
  // State to hold the list of current shells
  const [shells, setShells] = au.useState([]);

  // Callback to update the shells state with the latest shells
  const updateShells = au.useCallback(() => {
    setShells(aw.getAllShells());
  }, []);

  // Effect to subscribe to shell updates and clean up on unmount
  au.useEffect(() => {
    // Initial fetch of shells
    updateShells();

    // Subscribe to shell changes; update state on change
    const unsubscribe = aw.subscribe(() => {
      updateShells();
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [updateShells]);

  // Return the current shells and a function to kill a shell by updateSnapshotAndNotify
  return {
    shells,
    killShell: (shellId) => aw.killShell(shellId)
  };
}

module.exports = useShellManager;