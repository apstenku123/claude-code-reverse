/**
 * Manages the state and lifecycle of shell processes in a React component.
 * Fetches the current list of shells, subscribes to shell updates, and provides a method to kill shells.
 *
 * @returns {{ shells: Array, killShell: function }}
 *   shells: The current array of shell objects.
 *   killShell: Function to terminate a shell by its updateSnapshotAndNotify.
 */
function useShellsManager() {
  // State to hold the current list of shells
  const [shells, setShells] = au.useState([]);

  // Callback to update the shells state with the latest shells
  const updateShells = au.useCallback(() => {
    setShells(aw.getAllShells());
  }, []);

  // Effect to initialize shells and subscribe to shell updates
  au.useEffect(() => {
    // Fetch initial shells
    updateShells();
    // Subscribe to shell changes and update shells on change
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

module.exports = useShellsManager;